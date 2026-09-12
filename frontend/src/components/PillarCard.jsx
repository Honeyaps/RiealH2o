import { Mountain, FlaskConical, Sparkles, Leaf } from 'lucide-react';
import './PillarCard.css';

// Map each pillar id to its icon so data files stay data-only.
const ICONS = {
  source: Mountain,
  purification: Sparkles,
  tested: FlaskConical,
  eco: Leaf,
};

export default function PillarCard({ pillar, compact = false }) {
  const Icon = ICONS[pillar.id] || Sparkles;
  return (
    <article className={`pillar ${compact ? 'pillar--compact' : ''}`}>
      <div className="pillar__icon-wrap" aria-hidden="true">
        <span className="pillar__icon-ring" />
        <Icon size={compact ? 28 : 34} strokeWidth={1.5} />
      </div>
      <h3 className="pillar__title">{pillar.title}</h3>
      {!compact && <p className="pillar__text">{pillar.text}</p>}
    </article>
  );
}
