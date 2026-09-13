import { useEffect, useRef, useState } from 'react';
import './ComparisonBar.css';

/**
 * Animated horizontal comparison bar.
 * Props:
 *   label   — parameter name (e.g. "pH Level")
 *   value   — numeric value to fill to (out of max)
 *   max     — maximum value (default 100)
 *   display — text to show on bar (e.g. "7.2 pH")
 *   accent  — optional color override
 */
export default function ComparisonBar({ label, value, max = 100, display, accent }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="comp-bar" ref={ref}>
      <div className="comp-bar__header">
        <span className="comp-bar__label">{label}</span>
        <span className="comp-bar__display">{display}</span>
      </div>
      <div className="comp-bar__track">
        <div
          className="comp-bar__fill"
          style={{
            width: visible ? `${pct}%` : '0%',
            background: accent || undefined,
          }}
        />
      </div>
    </div>
  );
}
