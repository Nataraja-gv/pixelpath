import { Link } from 'react-router-dom';
import Logo from './Logo';
import PixelStairs from './PixelStairs';
import { CATEGORIES } from '@/lib/categories';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-white">
      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
            Short, project-based courses in technology, design, business and career skills.
          </p>
          <PixelStairs steps={6} size={10} gap={3} className="mt-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold">Courses</h2>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            {CATEGORIES.map((c) => (
              <li key={c.name}><Link className="hover:text-cobalt" to={`/courses?category=${c.name}`}>{c.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Academy</h2>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            <li><Link className="hover:text-cobalt" to="/about">About Pixelpath</Link></li>
            <li><Link className="hover:text-cobalt" to="/courses">All courses</Link></li>
            <li><Link className="hover:text-cobalt" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Talk to us</h2>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            hello@pixelpath.example<br />Mon to Sat, 9:30 am to 6 pm IST<br />Bengaluru, India
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-5 text-xs text-mute">
          © {new Date().getFullYear()} Pixelpath Academy. Demo site built for an assessment; course content is sample data.
        </p>
      </div>
    </footer>
  );
}
