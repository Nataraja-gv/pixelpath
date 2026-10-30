import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { supabase } from '@/lib/supabase';

const TOPICS = ['Enrollment', 'Course advice', 'Corporate training', 'Something else'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Check() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
      <motion.circle cx="26" cy="26" r="23" fill="none" stroke="#0F9D86" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
      <motion.path d="M15 27l8 8 14-16" fill="none" stroke="#0F9D86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
    </svg>
  );
}

export default function ContactForm({ defaultTopic = '', defaultCourse = '' }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    topic: TOPICS.includes(defaultTopic) ? defaultTopic : TOPICS[0],
    message: defaultCourse ? `Hi, I would like to know more about “${defaultCourse}”.` : '',
    company: '', // honeypot: real people leave this empty
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  function validate() {
    const e = {};
    if (values.name.trim().length < 2) e.name = 'Enter your name.';
    if (!EMAIL_RE.test(values.email.trim())) e.email = 'Enter a valid email, like name@example.com.';
    if (values.message.trim().length < 10) e.message = 'Write at least 10 characters so we can help.';
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    if (values.company) { setStatus('success'); return; } // bot, pretend it worked

    if (!supabase) {
      setServerError('The contact form is not connected to a database yet. Add the Supabase keys to .env.local.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setServerError('');
    const { error } = await supabase.from('messages').insert({
      name: values.name.trim(),
      email: values.email.trim(),
      topic: values.topic,
      message: values.message.trim(),
    });
    if (error) {
      setServerError('We could not save your message. Please try again in a minute.');
      setStatus('error');
      return;
    }
    setStatus('success');
  }

  const describedBy = (k) => (errors[k] ? `${k}-error` : undefined);

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div key="done" role="status" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-teal bg-white p-8 sm:p-10">
          <Check />
          <h2 className="mt-4 text-2xl font-bold">Message sent</h2>
          <p className="mt-2 text-mute">Thanks, {values.name.split(' ')[0]}. We will reply to {values.email} within one working day.</p>
          <button type="button" className="btn-ghost mt-6" onClick={() => { setStatus('idle'); setValues((v) => ({ ...v, message: '' })); }}>
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl border border-line bg-white p-6 sm:p-8">
          <div className="grid gap-5">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">Your name</label>
              <input id="name" name="name" autoComplete="name" value={values.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} className={`field mt-2 ${errors.name ? 'field-error' : ''}`} />
              {errors.name && <p id="name-error" className="mt-1 text-sm text-rose">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={set('email')} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} className={`field mt-2 ${errors.email ? 'field-error' : ''}`} />
              {errors.email && <p id="email-error" className="mt-1 text-sm text-rose">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="topic" className="text-sm font-semibold">What is this about?</label>
              <select id="topic" name="topic" value={values.topic} onChange={set('topic')} className="field mt-2">
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-semibold">Message</label>
              <textarea id="message" name="message" rows={6} value={values.message} onChange={set('message')} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message')} className={`field mt-2 ${errors.message ? 'field-error' : ''}`} />
              {errors.message && <p id="message-error" className="mt-1 text-sm text-rose">{errors.message}</p>}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
            </div>

            {status === 'error' && <p role="alert" className="rounded-lg border border-rose bg-rose/5 p-3 text-sm text-rose">{serverError}</p>}

            <motion.button type="submit" disabled={status === 'sending'} whileTap={{ scale: 0.97 }} className="btn-primary disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </motion.button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
