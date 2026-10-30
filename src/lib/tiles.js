// Deterministic mosaic tiles generated from a text seed.
function rng(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeTiles(seed, palette, cols = 8, rows = 4, size = 40) {
  const rand = rng(seed);
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tiles.push({
        key: `${r}-${c}`,
        x: c * size,
        y: r * size,
        shape: Math.floor(rand() * 4), // 0 square, 1 circle, 2 quarter, 3 empty
        fill: palette[Math.floor(rand() * palette.length)],
        rot: Math.floor(rand() * 4) * 90,
        size,
      });
    }
  }
  return tiles;
}
