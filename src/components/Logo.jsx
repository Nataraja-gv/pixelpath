import { motion } from 'motion/react';

// A pixel-built "P". The three coloured pixels are the path climbing into it.
const CELLS = [
  [0, 0], [1, 0], [2, 0],
  [0, 1], [3, 1],
  [0, 2], [3, 2],
  [0, 3], [1, 3], [2, 3],
  [0, 4], [0, 5],
  [1, 5, '#0F9D86'], [2, 4, '#E4447B'], [3, 3, '#F0A030'],
];

export function LogoMark({ height = 36 }) {
  return (
    <motion.svg
      viewBox="0 0 27 41"
      height={height}
      width={(height * 27) / 41}
      aria-hidden="true"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.035 }}
    >
      {CELLS.map(([c, r, color], i) => (
        <motion.rect
          key={`${c}-${r}`}
          x={c * 7}
          y={r * 7}
          width="6"
          height="6"
          rx="1"
          fill={color || '#2F5BEA'}
          custom={i}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            show: { scale: 1, opacity: 1 },
            hover: (n) => ({ y: [0, -3, 0], transition: { delay: Math.max(0, n - 11) * 0.09, duration: 0.4 } }),
          }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </motion.svg>
  );
}

export default function Logo() {
  return (
    <motion.span className="inline-flex items-center gap-2.5" whileHover="hover">
      <LogoMark />
      <span className="font-display text-2xl font-extrabold tracking-tight">
        pixel<span className="text-cobalt">path</span>
      </span>
    </motion.span>
  );
}
