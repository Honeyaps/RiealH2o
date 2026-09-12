import bottleImg from '../images/bottle.png';

/**
 * RIEAL H2O product bottle (real product photograph).
 *
 * The image ships with a white product-shot background; we blend it into the
 * page using CSS (mix-blend-mode) so the bottle appears to float on any
 * light-blue hero.
 *
 * Pass either `size` (px width, inline style) OR just a `className` that
 * sets width in CSS — the CSS-driven route wins when both are set.
 */
export default function Bottle({ size, className = '', ...props }) {
  const style = size ? { width: `${size}px`, height: 'auto' } : undefined;
  return (
    <img
      src={bottleImg}
      alt="RIEAL H2O 1 Litre packaged drinking water bottle"
      className={`brand-bottle ${className}`.trim()}
      style={style}
      {...props}
    />
  );
}
