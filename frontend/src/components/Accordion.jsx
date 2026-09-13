import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

/**
 * FAQ-style accordion.
 * Props:
 *   items — array of { question, answer }
 *   allowMultiple — allow multiple open at once (default false)
 */
export default function Accordion({ items, allowMultiple = false }) {
  const [openSet, setOpenSet] = useState(new Set());

  function toggle(idx) {
    setOpenSet((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = openSet.has(i);
        return (
          <div key={i} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <button
              className="accordion__trigger"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span className="accordion__question">{item.question}</span>
              <ChevronDown size={20} className="accordion__chevron" />
            </button>
            <div className="accordion__panel">
              <div className="accordion__answer">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
