/**
 * Hero background scene — mountains, sky, lake, sun.
 * Pure SVG so no external image is required. Sits behind the hero content
 * and the bottle, mirroring the reference layout.
 */
export default function HeroScene({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE3FF" />
          <stop offset="55%" stopColor="#E7F5FF" />
          <stop offset="100%" stopColor="#F4FBFF" />
        </linearGradient>

        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5AAEF9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0A3B87" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id="mountainA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8CB8D6" />
          <stop offset="100%" stopColor="#3C6D96" />
        </linearGradient>

        <linearGradient id="mountainB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8D5EA" />
          <stop offset="100%" stopColor="#6E9AC0" />
        </linearGradient>

        <linearGradient id="mountainC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DCEBF6" />
          <stop offset="100%" stopColor="#9EC0DA" />
        </linearGradient>

        <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)" />

      {/* Sun glow */}
      <circle cx="1150" cy="220" r="180" fill="#FFFFFF" opacity="0.55" filter="url(#softBlur)" />
      <circle cx="1150" cy="220" r="90" fill="#FFFFFF" opacity="0.9" filter="url(#softBlur)" />

      {/* Clouds */}
      <g fill="#FFFFFF" opacity="0.75" filter="url(#softBlur)">
        <ellipse cx="230" cy="160" rx="130" ry="18" />
        <ellipse cx="330" cy="150" rx="90" ry="14" />
        <ellipse cx="900" cy="120" rx="140" ry="16" />
        <ellipse cx="1420" cy="180" rx="110" ry="15" />
      </g>

      {/* Far mountains (lightest) */}
      <path
        d="M0 520 L120 400 L240 470 L340 380 L470 460 L600 360 L740 470
           L880 380 L1020 470 L1160 360 L1320 460 L1460 380 L1600 470 L1600 900 L0 900 Z"
        fill="url(#mountainC)"
        opacity="0.85"
      />

      {/* Mid mountains */}
      <path
        d="M0 620 L100 500 L220 560 L360 460 L520 570 L680 470
           L840 570 L1000 460 L1180 570 L1360 470 L1520 570 L1600 520 L1600 900 L0 900 Z"
        fill="url(#mountainB)"
        opacity="0.9"
      />

      {/* Snow caps */}
      <g fill="#FFFFFF" opacity="0.9">
        <path d="M340 460 L365 490 L380 470 L400 495 L410 480 L420 500 L360 500 Z" />
        <path d="M680 470 L700 500 L715 480 L735 505 L750 490 L760 510 L700 510 Z" />
        <path d="M1000 460 L1020 490 L1035 470 L1055 495 L1070 480 L1080 500 L1020 500 Z" />
        <path d="M1360 470 L1380 500 L1395 480 L1415 505 L1430 490 L1440 510 L1380 510 Z" />
      </g>

      {/* Foreground mountains (darkest) */}
      <path
        d="M0 700 L140 590 L280 650 L440 560 L620 660 L800 570
           L980 660 L1160 560 L1340 660 L1500 570 L1600 620 L1600 900 L0 900 Z"
        fill="url(#mountainA)"
      />

      {/* Lake */}
      <rect x="0" y="700" width="1600" height="200" fill="url(#lake)" />

      {/* Lake reflection ripples */}
      <g stroke="#FFFFFF" strokeWidth="1.2" opacity="0.4">
        <line x1="120" y1="740" x2="240" y2="740" />
        <line x1="360" y1="770" x2="500" y2="770" />
        <line x1="620" y1="800" x2="780" y2="800" />
        <line x1="900" y1="760" x2="1040" y2="760" />
        <line x1="1180" y1="800" x2="1320" y2="800" />
        <line x1="1400" y1="770" x2="1520" y2="770" />
      </g>

      {/* Lake highlight band */}
      <rect x="0" y="700" width="1600" height="14" fill="#FFFFFF" opacity="0.35" />
    </svg>
  );
}
