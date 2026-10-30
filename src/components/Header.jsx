import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Logo from './Logo';
import Arrow from './Arrow';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  return (
    <header className={`sticky top-0 z-40 border-b bg-paper/90 backdrop-blur transition-shadow ${scrolled ? 'border-line shadow-[0_8px_24px_-12px_rgba(16,27,51,0.2)]' : 'border-transparent'}`}>
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="Pixelpath Academy home"><Logo /></Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-cobalt ${isActive(l.href) ? 'text-ink' : 'text-mute'}`}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-px h-0.5 rounded bg-cobalt" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
            </Link>
          ))}
          <Link to="/courses" className="btn-primary group ml-3 !py-2">
            Browse courses
            <Arrow className="transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <motion.path initial={false} animate={{ d: open ? 'M4 4L16 16' : 'M3 6L17 6' }} />
            <motion.path initial={false} animate={{ opacity: open ? 0 : 1 }} d="M3 10L17 10" />
            <motion.path initial={false} animate={{ d: open ? 'M4 16L16 4' : 'M3 14L17 14' }} />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="overflow-hidden border-t border-line bg-paper md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="wrap flex flex-col py-3">
              {LINKS.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link to={l.href} aria-current={isActive(l.href) ? 'page' : undefined} className={`block rounded-md px-2 py-3 text-base font-medium ${isActive(l.href) ? 'text-cobalt' : 'text-ink'}`}>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
