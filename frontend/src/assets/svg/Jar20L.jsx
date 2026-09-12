/**
 * 20 Litre home/office jar used in the Products card row.
 */
export default function Jar20L({ size = 96, className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 140 200"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="RIEAL H2O 20 Litre jar"
      {...props}
    >
      <defs>
        <linearGradient id="jar-water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E5F4FF" />
          <stop offset="55%" stopColor="#9CD2FF" />
          <stop offset="100%" stopColor="#5AAEF9" />
        </linearGradient>
        <linearGradient id="jar-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F63C2" />
          <stop offset="100%" stopColor="#062B66" />
        </linearGradient>
      </defs>

      {/* Handle base */}
      <rect x="52" y="10" width="36" height="14" rx="2" fill="url(#jar-cap)" />
      {/* Neck */}
      <path d="M55 24 L85 24 L82 40 L58 40 Z" fill="#7EC0F0" opacity="0.95" />

      {/* Jar body */}
      <path
        d="M25 40 Q25 34 40 34 L100 34 Q115 34 115 40 L120 60
           Q124 80 124 110 L124 172 Q124 190 100 190 L40 190
           Q16 190 16 172 L16 110 Q16 80 20 60 Z"
        fill="url(#jar-water)"
        stroke="#5AAEF9"
        strokeWidth="1"
      />

      {/* Neck ring */}
      <ellipse cx="70" cy="40" rx="18" ry="3" fill="#062B66" opacity="0.15" />

      {/* Handle indent */}
      <rect x="98" y="70" width="18" height="30" rx="4" fill="#062B66" opacity="0.08" />

      {/* Ribbon label */}
      <rect x="16" y="98" width="108" height="50" fill="#0A3B87" opacity="0.9" />
      <g fontFamily="Plus Jakarta Sans, Inter, sans-serif" fontWeight="800" textAnchor="middle" fill="#FFFFFF">
        <text x="70" y="118" fontSize="14" letterSpacing="0.5">RIEAL</text>
        <text x="60" y="140" fontSize="18">H</text>
        <text x="70" y="144" fontSize="10">2</text>
        <text x="80" y="140" fontSize="18">O</text>
      </g>

      {/* Base */}
      <ellipse cx="70" cy="188" rx="45" ry="3" fill="#062B66" opacity="0.2" />
    </svg>
  );
}
