import logoImg from '../images/logo.png';
import './Logo.css';

/**
 * RIEAL H2O brand logo (actual brand artwork).
 *
 * variant:
 *   'light' (default) — image as-is, for light backgrounds (navbar, sections)
 *   'dark'            — image wrapped in a white pill so it stays legible on
 *                       the dark navy footer without needing a transparent PNG
 */
export default function Logo({ variant = 'light', className = '', ...props }) {
  if (variant === 'dark') {
    return (
      <span className={`brand-logo brand-logo--dark ${className}`.trim()}>
        <img src={logoImg} alt="RIEAL H2O" {...props} />
      </span>
    );
  }

  return (
    <img
      src={logoImg}
      alt="RIEAL H2O"
      className={`brand-logo brand-logo--light ${className}`.trim()}
      {...props}
    />
  );
}
