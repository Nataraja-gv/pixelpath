import { useMemo } from 'react';
import { motion } from 'motion/react';
import TileShape from './TileShape';
import { makeTiles } from '@/lib/tiles';

// Tiles pop in one after another when scrolled into view.
export default function Mosaic({ seed = 'pixelpath', cols = 8, rows = 6, className = '' }) {
  const tiles = useMemo(
    () => makeTiles(seed, ['#2F5BEA', '#E4447B', '#F0A030', '#0F9D86', '#101B33', '#DCE2EC'], cols, rows, 40),
    [seed, cols, rows]
  );
  return (
    <motion.svg
      viewBox={`0 0 ${cols * 40} ${rows * 40}`}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: 0.025 }}
      aria-hidden="true"
    >
      {tiles.map((t) => (
        <motion.g
          key={t.key}
          variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <TileShape t={t} />
        </motion.g>
      ))}
    </motion.svg>
  );
}
