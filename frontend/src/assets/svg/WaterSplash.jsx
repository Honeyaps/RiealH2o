/**
 * Decorative water splash — sits behind the hero bottle.
 */
export default function WaterSplash({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <radialGradient id="splashCore" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#BFE3FF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5AAEF9" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="dropletG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DFF3FF" />
          <stop offset="100%" stopColor="#5AAEF9" />
        </linearGradient>
      </defs>

      {/* Core glow */}
      <circle cx="400" cy="440" r="360" fill="url(#splashCore)" />

      {/* Splash arcs */}
      <g fill="none" stroke="#5AAEF9" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round">
        <path d="M120 460 Q 200 360, 320 400" />
        <path d="M680 460 Q 600 360, 480 400" />
        <path d="M180 560 Q 260 480, 340 520" />
        <path d="M620 560 Q 540 480, 460 520" />
        <path d="M400 240 Q 460 320, 420 400" />
        <path d="M400 240 Q 340 320, 380 400" />
      </g>

      {/* Droplets */}
      <g fill="url(#dropletG)">
        <ellipse cx="200" cy="360" rx="10" ry="14" />
        <ellipse cx="620" cy="380" rx="8" ry="12" />
        <ellipse cx="280" cy="240" rx="6" ry="10" />
        <ellipse cx="540" cy="220" rx="7" ry="11" />
        <ellipse cx="150" cy="520" rx="9" ry="13" />
        <ellipse cx="680" cy="540" rx="11" ry="15" />
        <ellipse cx="410" cy="180" rx="6" ry="9" />
        <ellipse cx="360" cy="620" rx="8" ry="12" />
        <ellipse cx="470" cy="640" rx="10" ry="14" />
      </g>
    </svg>
  );
}
