import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Mosaic from '@/components/Mosaic';
import Reveal from '@/components/Reveal';
import Arrow from '@/components/Arrow';

const VALUES = [
  { title: 'Projects over slides', text: 'Every course ends with something you built. We cut anything that does not help you build it.' },
  { title: 'Feedback you can use', text: 'Instructors review your work in detail and tell you what to change, not just what is wrong.' },
  { title: 'Fair pricing', text: 'Clear prices in rupees, no hidden tiers, and a refund window in the first week.' },
];

const TEAM = [
  { name: 'Ananya Rao', role: 'Web development lead', color: '#2F5BEA', on: '#fff' },
  { name: 'Sneha Kulkarni', role: 'Design lead', color: '#E4447B', on: '#fff' },
  { name: 'Arjun Nair', role: 'Product and business lead', color: '#F0A030', on: '#101B33' },
  { name: 'Rohit Verma', role: 'Career coach', color: '#0F9D86', on: '#fff' },
];

export default function About() {
  return (
    <>
      <title>About | Pixelpath Academy</title>
      <meta name="description" content="Why Pixelpath exists, how we teach, and who your instructors are." />

      <section className="wrap grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
        <div>
          <motion.h1 className="text-4xl font-extrabold leading-tight sm:text-6xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            A pixel is the smallest piece of a picture. A path is how you get there.
          </motion.h1>
          <motion.p className="mt-6 max-w-xl text-lg leading-relaxed text-mute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            We named the academy after both ideas. Skills are built from small pieces, one project, one habit and one honest review at a time, and a clear path shows you which piece comes next.
          </motion.p>
        </div>
        <Mosaic seed="pixelpath-about" cols={8} rows={6} className="w-full overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-line" />
      </section>

      <section className="wrap grid gap-10 py-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold">Our story</h2>
          <p className="mt-4 leading-relaxed">Pixelpath started in Bengaluru with a small group of working engineers, designers and managers who kept getting the same question from newcomers: where do I start, and how do I know I am improving?</p>
          <p className="mt-4 leading-relaxed">Our answer was short courses with one real project each, taught by people who still do the job. Learners get reviews they can act on, and a finished piece of work to show.</p>
        </Reveal>
        <div>
          <Reveal><h2 className="text-3xl font-bold">What we believe</h2></Reveal>
          <ul className="mt-4 space-y-4">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.1} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-bold">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-mute">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-12">
        <Reveal><h2 className="text-3xl font-bold">Who teaches</h2></Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6, rotate: -1 }} className="rounded-2xl border border-line bg-white p-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl font-display text-lg font-bold" style={{ background: t.color, color: t.on }} aria-hidden="true">
                  {t.name.split(' ').map((p) => p[0]).join('')}
                </span>
                <h3 className="mt-4 font-bold">{t.name}</h3>
                <p className="text-sm text-mute">{t.role}</p>
              </motion.div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="wrap py-12">
        <Reveal>
          <div className="rounded-2xl bg-ink px-6 py-12 text-white sm:px-14">
            <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Ready to take your first step?</h2>
            <Link to="/courses" className="btn-light group mt-6">Browse courses <Arrow className="transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
