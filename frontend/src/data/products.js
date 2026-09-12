// Product photos — imported so Vite bundles/optimises them
import img100ml from '../assets/images/100ml.png';
import img1L    from '../assets/images/1l.png';
import img2L    from '../assets/images/2l.png';
import img20L   from '../assets/images/20l.png';

/**
 * Informational pack sizes. This is NOT an e-commerce catalog — no prices,
 * no cart, no checkout. "Enquire" leads to the Contact page.
 *
 * Each entry has:
 *   image   — the product photo (imported at top of file)
 *   tileBg  — CSS background applied to the rounded photo tile on the card,
 *             chosen to match the image's own background so no seam shows
 *             between the photo and the tile.
 */
export const products = [
  {
    id: '100ml',
    volume: '100 ml',
    tagline: 'Perfect for on-the-go',
    description: 'A crisp, single-serve bottle for events, travel and quick refreshment.',
    image: img100ml,
  },
  {
    id: '1l',
    volume: '1 Litre',
    tagline: 'For everyday hydration',
    description: 'A generous serving that stays fresh from the first sip to the last.',
    image: img1L,
  },
  {
    id: '2l',
    volume: '2 Litre',
    tagline: 'Family size',
    description: 'For family meals and everyday hydration at home.',
    image: img2L,
  },
  {
    id: '20l',
    volume: '20 Litre Jar',
    tagline: 'For home & office',
    description: 'Reliable bulk hydration for homes, offices and gatherings.',
    image: img20L,
  },
];
