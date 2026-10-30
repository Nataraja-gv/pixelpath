import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import ContactForm from '@/components/ContactForm';

const INFO = [
  { k: 'Email', v: 'hello@pixelpath.example', color: '#2F5BEA' },
  { k: 'Phone', v: '+91 80 0000 0000', color: '#E4447B' },
  { k: 'Hours', v: 'Monday to Saturday, 9:30 am to 6 pm IST', color: '#F0A030' },
  { k: 'Studio', v: 'Bengaluru, Karnataka, India', color: '#0F9D86' },
];

export default function Contact() {
  const [params] = useSearchParams();
  const topic = params.get('topic') || '';
  const course = (params.get('course') || '').slice(0, 120);

  return (
    <section className="wrap grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_1.2fr]">
      <title>Contact | Pixelpath Academy</title>
      <meta name="description" content="Ask about a course, enrollment or training for your team. We reply within one working day." />
      <div>
        <motion.h1 className="text-4xl font-extrabold sm:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Talk to us</motion.h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-mute">Tell us what you want to learn and where you are now. A real person replies within one working day.</p>
        <ul className="mt-8 space-y-3">
          {INFO.map((i, n) => (
            <motion.li key={i.k} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + n * 0.1 }} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
              <span className="mt-1.5 h-3 w-3 shrink-0 rounded-sm" style={{ background: i.color }} aria-hidden="true" />
              <div><p className="text-sm font-bold">{i.k}</p><p className="text-sm text-mute">{i.v}</p></div>
            </motion.li>
          ))}
        </ul>
      </div>
      <ContactForm key={`${topic}-${course}`} defaultTopic={topic} defaultCourse={course} />
    </section>
  );
}
