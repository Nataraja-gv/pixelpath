import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import CourseCover from './CourseCover';
import Arrow from './Arrow';
import { categoryOf, formatPrice } from '@/lib/categories';

export default function CourseCard({ course }) {
  const cat = categoryOf(course.category);
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group h-full overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(16,27,51,0.35)]"
    >
      <Link to={`/courses/${course.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[2/1] overflow-hidden">
          <CourseCover slug={course.slug} category={course.category} className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110" />
          <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Arrow />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-mute">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: cat.color }} aria-hidden="true" />
            {cat.label}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug transition-colors group-hover:text-cobalt">{course.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mute">{course.summary}</p>
          <p className="mt-3 text-sm text-mute">{course.level}, {course.duration_weeks} weeks, with {course.instructor}</p>
          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="text-lg font-bold">{formatPrice(course.price)}</span>
            <span className="text-sm font-medium text-mute">
              <span aria-hidden="true" className="text-amber">★</span> {Number(course.rating).toFixed(1)}
              <span className="sr-only"> out of 5</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white" aria-hidden="true">
      <div className="skeleton aspect-[2/1]" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-6 w-4/5 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  );
}
