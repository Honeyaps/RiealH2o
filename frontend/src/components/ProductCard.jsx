import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './ProductCard.css';

/**
 * Product pack card — informational only. Tapping goes to the Contact page.
 * Uses each product's own photo, wrapped in a rounded "photo tile" whose
 * background matches the photo's own background (defined in products.js).
 */
export default function ProductCard({ product }) {
  return (
    <Link
      to="/contact"
      className="product-card"
      aria-label={`${product.volume} — enquire about this pack`}
    >
      <div
        className="product-card__visual"
        style={{ background: product.tileBg }}
      >
        <img
          src={product.image}
          alt={`RIEAL H2O ${product.volume} packaged drinking water`}
          className="product-card__img"
          loading="lazy"
        />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.volume}</h3>
        <p className="product-card__text">{product.tagline}</p>

        <span className="product-card__cta">
          <span>Enquire</span>
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
