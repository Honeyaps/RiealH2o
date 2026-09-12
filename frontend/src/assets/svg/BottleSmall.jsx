import bottleImg from '../images/bottle.png';

/**
 * Small RIEAL H2O bottle used in the Products / Choose Your Pack cards.
 * Uses the real product photo — the parent card sets a light background
 * so the white product-shot background disappears into the card.
 */
export default function BottleSmall({ size = 96, label = '', className = '', ...props }) {
  return (
    <img
      src={bottleImg}
      alt={label ? `RIEAL H2O ${label} bottle` : 'RIEAL H2O bottle'}
      className={`brand-bottle-small ${className}`.trim()}
      style={{ width: `${size}px`, height: 'auto' }}
      {...props}
    />
  );
}
