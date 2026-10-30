import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import CourseCover from '@/components/CourseCover';
import CourseCard from '@/components/CourseCard';
import Reveal from '@/components/Reveal';
import Arrow from '@/components/Arrow';
import NotFound from './NotFound';
import { useCourses } from '@/lib/courses';
import { categoryOf, formatPrice } from '@/lib/categories';

function Syllabus({ items, color }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <ol ref={ref} className="relative mt-6 space-y-3 pl-10">
      <span className="absolute bottom-2 left-3.5 top-2 w-0.5 bg-line" aria-hidden="true" />
      <motion.span className="absolute bottom-2 left-3.5 top-2 w-0.5 origin-top" style={{ scaleY, background: color }} aria-hidden="true" />
      {items.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          className="relative flex gap-4 rounded-xl border border-line bg-white p-4"
        >
          <span className="absolute top-5 -left-[1.94rem] h-3 w-3 rounded-sm" style={{ background: color }} aria-hidden="true" />
          <span className="w-14 shrink-0 text-sm font-semibold text-mute">Part {i + 1}</span>
          <span>{s}</span>
        </motion.li>
      ))}
    </ol>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const { courses, loading } = useCourses();

  if (loading) {
    return (
      <section className="wrap py-14" aria-busy="true">
        <div className="skeleton h-5 w-40 rounded" />
        <div className="skeleton mt-6 h-14 w-3/4 rounded" />
        <div className="skeleton mt-6 aspect-[2/1] max-w-3xl rounded-2xl" />
      </section>
    );
  }

  const course = courses.find((c) => c.slug === slug);
  if (!course) return <NotFound />;

  const cat = categoryOf(course.category);
  const related = courses.filter((c) => c.category === course.category && c.slug !== course.slug).slice(0, 3);
  const enquiry = `/contact?topic=Enrollment&course=${encodeURIComponent(course.title)}`;

  return (
    <>
      <title>{`${course.title} | Pixelpath Academy`}</title>
      <meta name="description" content={course.summary} />

      <section style={{ background: cat.tint }}>
        <div className="wrap grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-mute">
              <Link to="/courses" className="hover:text-cobalt">Courses</Link>
              <span aria-hidden="true"> / </span>
              <Link to={`/courses?category=${course.category}`} className="hover:text-cobalt">{cat.label}</Link>
            </nav>
            <motion.h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              {course.title}
            </motion.h1>
            <motion.p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {course.summary}
            </motion.p>
            <motion.ul className="mt-6 flex flex-wrap gap-2 text-sm font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <li className="rounded-full bg-white px-3 py-1.5">{course.level}</li>
              <li className="rounded-full bg-white px-3 py-1.5">{course.duration_weeks} weeks</li>
              <li className="rounded-full bg-white px-3 py-1.5"><span className="text-amber" aria-hidden="true">★</span> {Number(course.rating).toFixed(1)}</li>
            </motion.ul>
          </div>
          <motion.div
            className="overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(16,27,51,0.5)]"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <CourseCover slug={course.slug} category={course.category} className="aspect-[2/1] w-full" />
          </motion.div>
        </div>
      </section>

      <section className="wrap grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
        <div>
          <Reveal>
            <h2 className="text-2xl font-bold">About this course</h2>
            <p className="mt-3 max-w-2xl leading-relaxed">{course.description}</p>
          </Reveal>

          <Reveal className="mt-12"><h2 className="text-2xl font-bold">What you will learn</h2></Reveal>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {course.outcomes.map((o, i) => (
              <Reveal as="li" key={o} delay={i * 0.08} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed">
                <span className="mt-1 inline-block h-3 w-3 shrink-0 rounded-sm" style={{ background: cat.color }} aria-hidden="true" />
                {o}
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12"><h2 className="text-2xl font-bold">Course plan</h2></Reveal>
          <Syllabus items={course.syllabus} color={cat.color} />
        </div>

        <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="font-display text-4xl font-extrabold">{formatPrice(course.price)}</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-mute">Level</dt><dd className="font-medium">{course.level}</dd></div>
              <div className="flex justify-between"><dt className="text-mute">Duration</dt><dd className="font-medium">{course.duration_weeks} weeks</dd></div>
              <div className="flex justify-between"><dt className="text-mute">Instructor</dt><dd className="font-medium">{course.instructor}</dd></div>
              <div className="flex justify-between"><dt className="text-mute">Learners</dt><dd className="font-medium">{Number(course.learners).toLocaleString('en-IN')}</dd></div>
            </dl>
            <Link to={enquiry} className="btn-primary group mt-6 w-full">Ask about enrolling <Arrow className="transition-transform group-hover:translate-x-1" /></Link>
            <p className="mt-3 text-xs text-mute">Online enrolment is not part of this demo. This sends your question to our team.</p>
          </div>
        </motion.aside>
      </section>

      {related.length > 0 && (
        <section className="wrap py-10">
          <Reveal><h2 className="text-2xl font-bold">More in {cat.label}</h2></Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c, i) => <Reveal key={c.slug} delay={i * 0.1} className="h-full"><CourseCard course={c} /></Reveal>)}
          </div>
        </section>
      )}
    </>
  );
}
