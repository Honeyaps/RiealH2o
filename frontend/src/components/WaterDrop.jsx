import { useEffect, useRef, useState } from 'react';
import './WaterDrop.css';

/**
 * Interactive water-drop ripple — user clicks/taps to create
 * expanding ripple rings. A delightful micro-interaction.
 */
export default function WaterDrop() {
  const containerRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  function handleClick(e) {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1500);
  }

  return (
    <div
      className="water-drop-area"
      ref={containerRef}
      onClick={handleClick}
      role="presentation"
    >
      <div className="water-drop-area__content">
        <svg viewBox="0 0 80 120" className="water-drop-area__drop" aria-hidden="true">
          <defs>
            <linearGradient id="wdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4FB0FF" />
              <stop offset="100%" stopColor="#087FEF" />
            </linearGradient>
          </defs>
          <path
            d="M40 4 C 52 32, 68 52, 68 72 A 28 28 0 1 1 12 72 C 12 52, 28 32, 40 4 Z"
            fill="url(#wdGrad)"
          />
          <ellipse cx="28" cy="68" rx="6" ry="10" fill="#fff" opacity="0.45" />
        </svg>
        <p className="water-drop-area__label">Tap anywhere to create ripples</p>
      </div>

      {ripples.map((r) => (
        <span
          key={r.id}
          className="water-drop-area__ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}
