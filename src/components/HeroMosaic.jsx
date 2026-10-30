import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '@/lib/categories';

const SHAPES = [
  <rect key="a" x="60" y="60" width="60" height="60" fill="rgba(255,255,255,0.28)" />,
  <path key="b" d="M0 120 A120 120 0 0 1 120 0 L120 120 Z" fill="rgba(255,255,255,0.28)" />,
  <circle key="c" cx="90" cy="90" r="42" fill="rgba(16,27,51,0.2)" />,
  <path key="d" d="M120 120 A120 120 0 0 1 0 0 L0 120 Z" fill="rgba(255,255,255,0.28)" />,
];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.55 } },
};
const tile = {
  hidden: { opacity: 0, scale: 0.4, rotate: -14 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 130, damping: 12 } },
};

// Loose shapes drifting around the tiles
const FLOATERS = [
  { cls: 'left-[-6%] top-[2%] h-8 w-8 rounded-full bg-amber', dur: 6, dy: 14 },
  { cls: 'right-[-4%] top-[30%] h-6 w-6 rounded-sm bg-rose', dur: 7, dy: -16, rot: 90 },
  { cls: 'bottom-[-4%] left-[18%] h-7 w-7 rounded-sm bg-teal', dur: 8, dy: 12, rot: -90 },
  { cls: 'bottom-[8%] right-[-6%] h-9 w-9 rounded-full bg-cobalt/80', dur: 9, dy: -12 },
];

export default function HeroMosaic({ counts }) {
  return (
    <div className="relative">
      {FLOATERS.map((f, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`absolute ${f.cls}`}
          animate={{ y: [0, f.dy, 0], rotate: [0, f.rot || 0, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.ul className="relative grid grid-cols-2 gap-3 sm:gap-4" variants={list} initial="hidden" animate="show" aria-label="Course categories">
        {CATEGORIES.map((c, i) => (
          <motion.li key={c.name} variants={tile} className={i % 2 === 1 ? 'mt-6 sm:mt-10' : ''}>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <Link
                to={`/courses?category=${c.name}`}
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-[0_20px_40px_-24px_rgba(16,27,51,0.5)] transition-shadow hover:shadow-[0_28px_50px_-20px_rgba(16,27,51,0.6)] sm:p-6"
                style={{ background: c.color, color: c.onColor }}
              >
                <svg viewBox="0 0 120 120" className="absolute bottom-0 right-0 h-28 w-28 origin-bottom-right transition-transform duration-700 group-hover:rotate-12 group-hover:scale-125 sm:h-36 sm:w-36" aria-hidden="true">
                  {SHAPES[i % SHAPES.length]}
                </svg>
                <span className="relative text-sm font-medium opacity-90">{counts[c.name] || 0} courses</span>
                <span className="relative">
                  <span className="block font-display text-xl font-bold leading-tight sm:text-2xl">{c.label}</span>
                  <span className="mt-1 block text-sm opacity-90">{c.blurb}</span>
                </span>
              </Link>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
