import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import CourseCard, { CardSkeleton } from '@/components/CourseCard';
import Reveal from '@/components/Reveal';
import { useCourses } from '@/lib/courses';
import { CATEGORIES, LEVELS } from '@/lib/categories';

const ALL = [{ name: 'All', label: 'All categories', color: '#101B33' }, ...CATEGORIES];

export default function Courses() {
  const { courses, loading } = useCourses();
  const [params, setParams] = useSearchParams();
  const wanted = params.get('category');
  const category = CATEGORIES.some((c) => c.name === wanted) ? wanted : 'All';

  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const [sort, setSort] = useState('popular');

  const setCategory = (name) => {
    const next = new URLSearchParams(params);
    if (name === 'All') next.delete('category'); else next.set('category', name);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = courses.filter((c) => {
      if (category !== 'All' && c.category !== category) return false;
      if (level !== 'All' && c.level !== level) return false;
      if (!q) return true;
      return [c.title, c.summary, c.instructor, c.category].join(' ').toLowerCase().includes(q);
    });
    if (sort === 'popular') list.sort((a, b) => b.learners - a.learners);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    return list;
  }, [courses, query, category, level, sort]);

  const filtersActive = query || category !== 'All' || level !== 'All';
  const reset = () => { setQuery(''); setLevel('All'); setSort('popular'); setCategory('All'); };

  return (
    <section className="wrap py-12 sm:py-16">
      <title>Courses | Pixelpath Academy</title>
      <meta name="description" content="Browse technology, design, business and career development courses. Filter by category and level." />

      <Reveal>
        <h1 className="text-4xl font-extrabold sm:text-6xl">All courses</h1>
        <p className="mt-3 max-w-2xl text-lg text-mute">Every course is built around one project. Search, filter by level, and open a course to see the full plan.</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 rounded-2xl border border-line bg-white p-4 sm:p-5">
        <label htmlFor="search" className="text-sm font-semibold">Search courses</label>
        <input id="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “react”, “figma” or “interview”" className="field mt-2" />

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {ALL.map((c) => {
            const on = category === c.name;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(c.name)}
                className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${on ? 'border-ink text-white' : 'border-line bg-white text-ink hover:border-ink'}`}
              >
                {on && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                {c.name !== 'All' && <span className="relative h-2.5 w-2.5 rounded-sm" style={{ background: c.color }} aria-hidden="true" />}
                <span className="relative">{c.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="level" className="text-sm font-semibold">Level</label>
            <select id="level" value={level} onChange={(e) => setLevel(e.target.value)} className="field mt-2">
              <option value="All">All levels</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="text-sm font-semibold">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="field mt-2">
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
        </div>
      </Reveal>

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-mute" role="status" aria-live="polite">Showing {results.length} of {courses.length} courses</p>
          {results.length > 0 ? (
            <motion.div layout className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((c) => (
                  <motion.div
                    key={c.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  >
                    <CourseCard course={c} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
              <h2 className="text-xl font-bold">No courses match those filters</h2>
              <p className="mt-2 text-mute">Try a shorter search word or clear the filters to see everything.</p>
              {filtersActive && <button type="button" onClick={reset} className="btn-primary mt-6">Clear filters</button>}
            </motion.div>
          )}
        </>
      )}
    </section>
  );
}
