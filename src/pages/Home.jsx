import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import HeroMosaic from '@/components/HeroMosaic';
import CourseCard, { CardSkeleton } from '@/components/CourseCard';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Arrow from '@/components/Arrow';
import PixelStairs from '@/components/PixelStairs';
import SectionHeading from '@/components/SectionHeading';
import { useCourses } from '@/lib/courses';

const TOPICS = ['React', 'Python', 'Figma', 'SQL', 'Branding', 'AWS', 'Product management', 'SEO', 'Interviews', 'Financial modelling', 'Writing', 'Prototyping'];
const TILE_COLORS = ['#2F5BEA', '#E4447B', '#F0A030', '#0F9D86'];

const STEPS = [
  { title: 'Pick a craft', text: 'Choose a course by level and time. Each one is built around a single project you can show.' },
  { title: 'Build every week', text: 'Short lessons, then hands-on work. You never wait more than a few days for feedback.' },
  { title: 'Get reviewed', text: 'Your instructor reviews your project line by line and tells you what to fix next.' },
  { title: 'Show your work', text: 'Finish with a portfolio piece and a clear story to tell in interviews.' },
];

const STORIES = [
  { quote: 'I had tutorials saved for two years. Eight weeks here and I had a case study that got me interviews.', name: 'Pooja S.', detail: 'UI/UX Design Foundations' },
  { quote: 'The code reviews were the difference. Someone finally told me why my components kept getting messy.', name: 'Imran A.', detail: 'Full-Stack Web Development' },
  { quote: 'The interview course was only three weeks, but my answers stopped rambling. I got the offer.', name: 'Divya R.', detail: 'Interview Mastery for Tech Roles' },
];

function Headline({ text }) {
  return (
    <h1 aria-label={text} className="text-5xl font-extrabold leading-[1.02] sm:text-7xl">
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function Bento() {
  const bars = [
    { label: 'Wireframes', pct: 100, color: '#2F5BEA' },
    { label: 'Prototype', pct: 80, color: '#E4447B' },
    { label: 'Case study', pct: 55, color: '#0F9D86' },
  ];
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      <Reveal className="rounded-2xl border border-line bg-white p-7 md:col-span-2">
        <h3 className="text-2xl font-bold">A real project in every course</h3>
        <p className="mt-2 max-w-md text-mute">You do not finish with notes. You finish with something you built and can link to.</p>
        <div className="mt-6 space-y-4">
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="flex justify-between text-sm font-medium"><span>{b.label}</span><span className="text-mute">{b.pct}%</span></div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-paper">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: b.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.2, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="rounded-2xl bg-ink p-7 text-white">
        <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
          <g className="spin-slow"><path d="M32 32 L32 12" stroke="#F0A030" strokeWidth="4" strokeLinecap="round" /></g>
          <circle cx="32" cy="32" r="3" fill="#fff" />
        </svg>
        <h3 className="mt-5 text-2xl font-bold">Reviews within 48 hours</h3>
        <p className="mt-2 text-white/75">Quick, specific feedback keeps you moving.</p>
      </Reveal>

      <Reveal delay={0.1} className="rounded-2xl border border-line bg-white p-7">
        <div className="flex">
          {['AR', 'SK', 'AN', 'RV'].map((n, i) => (
            <motion.span
              key={n}
              initial={{ scale: 0, x: -10 }}
              whileInView={{ scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 + i * 0.12 }}
              className="-ml-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white font-display text-sm font-bold first:ml-0"
              style={{ background: TILE_COLORS[i], color: i === 2 ? '#101B33' : '#fff' }}
            >
              {n}
            </motion.span>
          ))}
        </div>
        <h3 className="mt-5 text-2xl font-bold">Taught by people who do the work</h3>
        <p className="mt-2 text-mute">Engineers, designers and product leads who still ship.</p>
      </Reveal>

      <Reveal delay={0.2} className="rounded-2xl border border-line bg-white p-7 md:col-span-2">
        <div className="flex gap-2" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className="h-8 flex-1 rounded-md"
              style={{ background: TILE_COLORS[i % 4] }}
              animate={{ opacity: [0.25, 1, 0.25], scaleY: [0.8, 1, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <h3 className="mt-5 text-2xl font-bold">Short courses, steady pace</h3>
        <p className="mt-2 max-w-lg text-mute">From three weeks to twelve. One clear week at a time, with prices in rupees and a refund window in the first week.</p>
      </Reveal>
    </div>
  );
}

function Stories() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % STORIES.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const s = STORIES[i];
  return (
    <div
      className="mt-8 rounded-2xl bg-white p-8 ring-1 ring-line sm:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="min-h-44">
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
            <blockquote className="max-w-3xl font-display text-2xl font-semibold leading-snug sm:text-3xl">“{s.quote}”</blockquote>
            <figcaption className="mt-5 text-mute"><span className="font-semibold text-ink">{s.name}</span>, {s.detail}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex gap-2" role="group" aria-label="Choose a story">
        {STORIES.map((st, idx) => (
          <button
            key={st.name}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show story from ${st.name}`}
            aria-current={idx === i}
            className="h-2.5 rounded-full transition-all"
            style={{ width: idx === i ? 36 : 10, background: idx === i ? TILE_COLORS[idx] : '#DCE2EC' }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { courses, loading } = useCourses();
  const featured = courses.slice(0, 3);
  const counts = courses.reduce((acc, c) => ({ ...acc, [c.category]: (acc[c.category] || 0) + 1 }), {});
  const learners = courses.reduce((n, c) => n + Number(c.learners), 0);
  const rating = courses.length ? courses.reduce((n, c) => n + Number(c.rating), 0) / courses.length : 4.7;

  const stats = [
    { label: 'courses', to: courses.length || 12, color: '#2F5BEA', on: '#fff' },
    { label: 'learners so far', to: learners || 19000, color: '#E4447B', on: '#fff' },
    { label: 'average rating', to: Number(rating.toFixed(1)), decimals: 1, color: '#F0A030', on: '#101B33' },
    { label: 'instructors', to: 8, color: '#0F9D86', on: '#fff' },
  ];

  return (
    <>
      <title>Pixelpath Academy | Learn technology, design, business and career skills</title>
      <meta name="description" content="Short, project-based online courses in technology, design, business and career development." />

      <section className="wrap grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Headline text="Pick a craft. Build something real." />
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-mute"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
          >
            Pixelpath is an online academy for technology, design, business and career skills. Short, project-based courses taught by people who do the work.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}
          >
            <Link to="/courses" className="btn-primary group">Browse courses <Arrow className="transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/contact" className="btn-ghost">Talk to an advisor</Link>
          </motion.div>
          <PixelStairs steps={8} size={16} gap={5} className="mt-12" />
          <p className="mt-3 text-sm font-medium text-mute">One step at a time.</p>
        </div>
        <HeroMosaic counts={counts} />
      </section>

      <div className="overflow-hidden border-y border-line bg-white py-4" aria-hidden="true">
        <div className="marquee flex w-max">
          {[...TOPICS, ...TOPICS].map((t, i) => (
            <span key={i} className="flex items-center gap-4 pr-10 font-display text-lg font-semibold text-ink">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ background: TILE_COLORS[i % 4] }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      <section className="wrap py-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionHeading>Popular right now</SectionHeading>
            <p className="mt-2 text-mute">The courses most learners joined this month.</p>
          </div>
          <Link to="/courses" className="group inline-flex items-center gap-2 text-sm font-semibold text-cobalt">
            See all courses <Arrow className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [0, 1, 2].map((i) => <CardSkeleton key={i} />)
            : featured.map((c, i) => <Reveal key={c.slug} delay={i * 0.1} className="h-full"><CourseCard course={c} /></Reveal>)}
        </div>
      </section>

      <section className="wrap py-12">
        <Reveal><SectionHeading>Why learners stay</SectionHeading></Reveal>
        <Bento />
      </section>

      <section className="wrap py-12">
        <Reveal><SectionHeading>How a course works</SectionHeading></Reveal>
        <div className="relative mt-10">
          <motion.div
            className="absolute left-0 right-0 top-[1.1rem] hidden h-0.5 origin-left lg:block"
            style={{ background: 'linear-gradient(90deg,#2F5BEA,#E4447B,#F0A030,#0F9D86)' }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.4, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12}>
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-bold" style={{ background: TILE_COLORS[i], color: i === 2 ? '#101B33' : '#fff' }}>{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl p-7" style={{ background: s.color, color: s.on }}>
                <p className="font-display text-5xl font-extrabold"><CountUp to={s.to} decimals={s.decimals || 0} suffix={s.label === 'learners so far' ? '+' : ''} /></p>
                <p className="mt-1 text-sm font-medium opacity-90">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap py-12">
        <Reveal><SectionHeading>What learners say</SectionHeading></Reveal>
        <Stories />
      </section>

      <section className="wrap py-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-14 text-white sm:px-14">
            <motion.span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cobalt/60" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity }} />
            <motion.span aria-hidden="true" className="absolute -bottom-8 right-24 h-24 w-24 rounded-md bg-rose/70" animate={{ rotate: [0, 90, 0] }} transition={{ duration: 9, repeat: Infinity }} />
            <h2 className="relative max-w-xl text-3xl font-bold sm:text-5xl">Not sure which course fits?</h2>
            <p className="relative mt-3 max-w-xl text-white/80">Tell us your goal and current level. An advisor replies within one working day.</p>
            <div className="absolute bottom-6 right-6 hidden sm:block"><PixelStairs steps={6} size={12} gap={4} /></div>
            <Link to="/contact" className="btn-light group relative mt-8">Ask an advisor <Arrow className="transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
