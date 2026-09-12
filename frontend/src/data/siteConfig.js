/**
 * Central config for anything an editor might want to change without
 * hunting through JSX — brand strings, nav, contact, social.
 */
export const siteConfig = {
  brand: {
    name: 'RIEAL H2O',
    tagline: 'Pure Water. Better Tomorrow.',
    headline: "Nature's Purity, In Every Drop",
    supporting:
      'Pure, fresh and trusted drinking water, carefully sourced and purified for a healthier tomorrow.',
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Our Water', to: '/our-water' },
    { label: 'Why RIEAL', to: '/why-real' },
    { label: 'Contact', to: '/contact' },
  ],

  cta: {
    primary: 'Discover RIEAL H2O',
    secondary: 'Contact Us',
    navbar: 'Get in Touch',
  },

  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@rieal-h2o.example',
    phone: import.meta.env.VITE_CONTACT_PHONE || '+91 00000 00000',
    address:
      import.meta.env.VITE_CONTACT_ADDRESS ||
      'RIEAL H2O, Sri Anandpur sahib, Punjab, India',
    hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
  },

  social: [
    { name: 'Instagram', href: 'https://instagram.com/' },
    { name: 'Facebook',  href: 'https://facebook.com/'  },
    { name: 'YouTube',   href: 'https://youtube.com/'   },
  ],

  legal: {
    copyright: `© ${new Date().getFullYear()} RIEAL H2O. All rights reserved.`,
  },
};
