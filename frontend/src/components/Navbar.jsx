import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';
import Logo from '../assets/svg/Logo';
import { siteConfig } from '../data/siteConfig';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Track scroll to swap navbar surface style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__brand" aria-label="RIEAL H2O — Home">
          <Logo className="navbar__logo" />
        </NavLink>

        <nav className="navbar__nav" aria-label="Primary">
          <ul className="navbar__list">
            {siteConfig.nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'is-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <NavLink to="/contact" className="navbar__cta">
            <Mail size={16} />
            <span>{siteConfig.cta.navbar}</span>
          </NavLink>

          <button
            type="button"
            className="navbar__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {siteConfig.nav.map((item, i) => (
              <li key={item.to} style={{ transitionDelay: `${i * 50 + 80}ms` }}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `navbar__mobile-link ${isActive ? 'is-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li style={{ transitionDelay: `${siteConfig.nav.length * 50 + 80}ms` }}>
              <NavLink to="/contact" className="navbar__mobile-cta">
                <Mail size={18} />
                {siteConfig.cta.navbar}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
