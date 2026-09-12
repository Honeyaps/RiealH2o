import { Mountain, Sparkles, FlaskConical, Package, GlassWater } from 'lucide-react';
import Reveal from './Reveal';
import './ProcessStep.css';

const ICONS = {
  '01': Mountain,
  '02': Sparkles,
  '03': FlaskConical,
  '04': Package,
  '05': GlassWater,
};

export default function ProcessStep({ step, index, last }) {
  const Icon = ICONS[step.step] || Sparkles;
  const flipped = index % 2 === 1;

  return (
    <Reveal from={flipped ? 'right' : 'left'} distance={40}>
      <article className={`step ${flipped ? 'step--flip' : ''}`}>
        <div className="step__index">
          <span className="step__badge">
            <Icon size={22} strokeWidth={1.75} />
          </span>
          <span className="step__num">{step.step}</span>
          {!last && <span className="step__line" aria-hidden="true" />}
        </div>

        <div className="step__body">
          <h3 className="step__title">{step.title}</h3>
          <p className="step__text">{step.text}</p>
        </div>
      </article>
    </Reveal>
  );
}
