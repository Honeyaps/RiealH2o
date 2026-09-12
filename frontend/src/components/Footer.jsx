import { NavLink } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../assets/svg/Logo';
import { siteConfig } from '../data/siteConfig';
import './Footer.css';

const SOCIAL_ICONS = {
  Instagram: Instagram,
  Facebook: Facebook,
  YouTube: Youtube,
};

export default function Footer() {
  return (
    <footer className="footer">
      {/* Decorative wave */}
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0 40 C 240 80, 480 0, 720 40 C 960 80, 1200 0, 1440 40 L 1440 0 L 0 0 Z"
            fill="#062B66"
          />
        </svg>
      </div>

      <div className="footer__body">
        <div className="container footer__grid">
          <div className="footer__brand-col">
            <NavLink to="/" aria-label="RIEAL H2O — Home">
              <Logo variant="dark" className="footer__logo" />
            </NavLink>
            <p className="footer__tagline">{siteConfig.brand.tagline}</p>
            <p className="footer__blurb">
              RIEAL H2O — a premium packaged drinking water brand committed to purity,
              hygiene and freshness in every drop.
            </p>

            <ul className="footer__social" aria-label="Social">
              {siteConfig.social.map(({ name, href }) => {
                const Icon = SOCIAL_ICONS[name] || Instagram;
                return (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Explore</h3>
            <ul>
              {siteConfig.nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Company</h3>
            <ul>
              <li><NavLink to="/about">Our Story</NavLink></li>
              <li><NavLink to="/why-real">Why RIEAL</NavLink></li>
              <li><NavLink to="/our-water">Water Process</NavLink></li>
              <li><NavLink to="/contact">Partnerships</NavLink></li>
            </ul>
          </div>

          <div className="footer__col footer__contact">
            <h3 className="footer__col-title">Get in Touch</h3>
            <ul>
              <li>
                <Mail size={16} />
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <Phone size={16} />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}>
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <MapPin size={16} />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer__meta">
          <p className="footer__copy">{siteConfig.legal.copyright}</p>
          <p className="footer__legal">
            Crafted with care for a healthier tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
}
