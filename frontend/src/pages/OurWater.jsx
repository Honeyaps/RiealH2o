import { Droplets } from 'lucide-react';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import ProcessStep from '../components/ProcessStep';
import Reveal from '../components/Reveal';

import { waterJourney } from '../data/features';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './OurWater.css';

export default function OurWater() {
  useDocumentTitle(
    'Our Water — RIEAL H2O',
    'From natural source to safe packaging — see the RIEAL H2O water journey and quality process.'
  );

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="eyebrow">The RIEAL H2O Water Journey</span>
            <h1 className="page-hero__title heading-display">
              From <span className="text-royal">source</span> to sip —
              <br />the five steps behind every bottle.
            </h1>
            <p className="page-hero__text">
              Purity is not an accident. Here is the deliberate process every
              drop of RIEAL H2O passes through before it reaches your table.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section className="journey section">
        <div className="container journey__grid">
          {waterJourney.map((step, i) => (
            <ProcessStep
              key={step.step}
              step={step}
              index={i}
              last={i === waterJourney.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Quality panel */}
      <section className="quality section section--tint">
        <div className="container quality__grid">
          <Reveal from="left">
            <SectionHeading
              eyebrow="Our Commitment"
              title="Quality is a discipline, not a claim."
              subtitle="We treat purity as a process — measurable, repeatable and independently verifiable. That discipline is why RIEAL H2O tastes the same every time you open a bottle."
            />
            <Button to="/why-real" variant="outline">Why RIEAL Stands Out</Button>
          </Reveal>

          <Reveal from="right" className="quality__stats">
            <div className="quality__stat">
              <span className="quality__stat-num">5</span>
              <span className="quality__stat-label">Purification stages</span>
            </div>
            <div className="quality__stat">
              <span className="quality__stat-num">100%</span>
              <span className="quality__stat-label">Batch tested</span>
            </div>
            <div className="quality__stat">
              <span className="quality__stat-num">
                <Droplets size={30} strokeWidth={1.75} />
              </span>
              <span className="quality__stat-label">Fresh always</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
