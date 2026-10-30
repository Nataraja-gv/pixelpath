import { motion } from 'motion/react';

const COLORS = ['#2F5BEA', '#E4447B', '#F0A030', '#0F9D86'];

// The logo's staircase: each column is one step higher. The top pixel of each step is coloured.
export default function PixelStairs({ steps = 7, size = 14, gap = 4, missing = -1, className = '' }) {
  return (
    <motion.div
      className={`flex items-end ${className}`}
      style={{ gap }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      aria-hidden="true"
    >
      {Array.from({ length: steps }).map((_, c) => (
        <div key={c} className="flex flex-col-reverse" style={{ gap, width: size }}>
          {c === missing
            ? null
            : Array.from({ length: c + 1 }).map((__, r) => (
                <motion.span
                  key={r}
                  variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  style={{ width: size, height: size, borderRadius: 2, background: r === c ? COLORS[c % 4] : '#DCE2EC' }}
                />
              ))}
        </div>
      ))}
    </motion.div>
  );
}
