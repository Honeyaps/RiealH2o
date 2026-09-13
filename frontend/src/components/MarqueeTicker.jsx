import './MarqueeTicker.css';

/**
 * Infinite horizontal scrolling marquee ticker.
 * Props:
 *   items    — array of strings to scroll
 *   speed    — animation duration in seconds (default 30)
 *   reverse  — scroll right-to-left reversed (default false)
 *   separator — character between items (default '✦')
 */
export default function MarqueeTicker({
  items,
  speed = 30,
  reverse = false,
  separator = '✦',
}) {
  // Duplicate items for seamless loop
  const content = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div
        className={`marquee__track ${reverse ? 'marquee__track--reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {content.map((item, i) => (
          <span key={i} className="marquee__item">
            <span className="marquee__text">{item}</span>
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
