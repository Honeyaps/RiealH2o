import { useEffect, useRef, useState } from 'react';
import './AnimatedCounter.css';

/**
 * Animated number counter that counts up when scrolled into view.
 * Props:
 *   end      — target number
 *   suffix   — text after number (e.g. '+', '%', 'L')
 *   prefix   — text before number (e.g. '₹')
 *   label    — descriptor text below number
 *   duration — animation duration in ms (default 2000)
 */
export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  label,
  duration = 2000,
}) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setCount(end);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    let raf;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return (
    <div className="animated-counter" ref={ref}>
      <span className="animated-counter__number">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      {label && <span className="animated-counter__label">{label}</span>}
    </div>
  );
}
