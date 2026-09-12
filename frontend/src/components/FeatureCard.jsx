import './FeatureCard.css';

/**
 * Compact icon + title + text card used in the hero trust row and
 * elsewhere on the site.
 */
export default function FeatureCard({ icon: Icon, title, text, variant = 'minimal' }) {
  return (
    <article className={`feature feature--${variant}`}>
      <span className="feature__icon" aria-hidden="true">
        {Icon && <Icon size={26} strokeWidth={1.75} />}
      </span>
      <h3 className="feature__title">{title}</h3>
      <p className="feature__text">{text}</p>
    </article>
  );
}
