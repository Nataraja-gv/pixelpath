import { useMemo } from 'react';
import TileShape from './TileShape';
import { categoryOf } from '@/lib/categories';
import { makeTiles } from '@/lib/tiles';

// Cover art generated from the course slug, so no image files are needed.
export default function CourseCover({ slug, category, className = '' }) {
  const cat = categoryOf(category);
  const tiles = useMemo(
    () => makeTiles(slug, [cat.color, cat.tint, '#101B33', '#FFFFFF', cat.color]),
    [slug, cat.color, cat.tint]
  );
  return (
    <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={`${cat.label} course cover art`}>
      <rect width="320" height="160" fill={cat.tint} />
      {tiles.map((t) => <TileShape key={t.key} t={t} />)}
    </svg>
  );
}
