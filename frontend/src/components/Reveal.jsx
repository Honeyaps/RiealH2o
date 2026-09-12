import { useEffect, useRef, useState } from 'react';
import './Reveal.css';

/**
 * Scroll-reveal wrapper using IntersectionObserver.
 * No framer-motion cost here — just adds a class when the element enters view.
 *
 * Props
 *   as:      element tag (default 'div')
 *   delay:   ms delay before animating (default 0)
 *   from:    'up' | 'down' | 'left' | 'right' | 'fade' (default 'up')
 *   distance: initial translation in px (default 24)
 *   once:    animate once and forget (default true)
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  delay = 0,
  from = 'up',
  distance = 24,
  once = true,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const initialTransform = {
    up: `translate3d(0, ${distance}px, 0)`,
    down: `translate3d(0, -${distance}px, 0)`,
    left: `translate3d(${distance}px, 0, 0)`,
    right: `translate3d(-${distance}px, 0, 0)`,
    fade: 'none',
  }[from];

  const inlineStyle = {
    transitionDelay: `${delay}ms`,
    transform: visible ? 'translate3d(0, 0, 0)' : initialTransform,
    opacity: visible ? 1 : 0,
    ...style,
  };

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={inlineStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
