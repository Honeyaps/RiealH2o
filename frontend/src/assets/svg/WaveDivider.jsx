/**
 * Full-width wave divider used between sections. Sits inside a section
 * with position: relative; the SVG absolutely positions itself along the
 * bottom.
 */
export default function WaveDivider({
  color = '#F4FBFF',
  flip = false,
  className = '',
  ...props
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 60 C 240 100, 480 20, 720 60 C 960 100, 1200 20, 1440 60 L 1440 120 L 0 120 Z"
        fill={color}
      />
    </svg>
  );
}
