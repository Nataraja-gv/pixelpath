// One mosaic tile as SVG. Used by CourseCover (static) and Mosaic (animated).
export default function TileShape({ t }) {
  const { x, y, size, shape, fill, rot } = t;
  if (shape === 0) return <rect x={x} y={y} width={size} height={size} fill={fill} />;
  if (shape === 1) return <circle cx={x + size / 2} cy={y + size / 2} r={size * 0.38} fill={fill} />;
  if (shape === 2) {
    return (
      <path
        d={`M${x} ${y + size} A${size} ${size} 0 0 1 ${x + size} ${y} L${x + size} ${y + size} Z`}
        fill={fill}
        transform={`rotate(${rot} ${x + size / 2} ${y + size / 2})`}
      />
    );
  }
  return null;
}
