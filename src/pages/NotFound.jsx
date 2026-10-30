import { Link } from 'react-router-dom';
import PixelStairs from '@/components/PixelStairs';

export default function NotFound() {
  return (
    <section className="wrap py-24">
      <title>Page not found | Pixelpath Academy</title>
      <h1 className="text-4xl font-bold sm:text-6xl">We couldn’t find that page</h1>
      <p className="mt-4 max-w-xl text-mute">The link may be old, or the course may have been renamed. Try the full course list.</p>
      <PixelStairs steps={7} size={16} gap={5} missing={4} className="mt-10" />
      <Link to="/courses" className="btn-primary mt-8">Browse courses</Link>
    </section>
  );
}
