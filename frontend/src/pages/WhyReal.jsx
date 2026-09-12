import { Check } from 'lucide-react';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import PillarCard from '../components/PillarCard';
import Reveal from '../components/Reveal';

import Bottle from '../assets/svg/Bottle';

import { pillars } from '../data/features';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './WhyReal.css';

const reasons = [
  {
    title: 'Trusted by every generation of the family',
    text: 'From the kitchen counter to the child’s lunch box — a hydration you never have to second-guess.',
  },
  {
    title: 'Consistent taste, every single time',
    text: 'Batch-level testing means every bottle tastes the same clean, crisp taste you expect.',
  },
  {
    title: 'A brand built for scale — homes, offices, communities',
    text: 'From single bottles to 20-litre jars, RIEAL H2O scales with your everyday need.',
  },
  {
    title: 'People-first, planet-aware',
    text: 'We think carefully about packaging, sourcing and the footprint we leave behind.',
  },
];

export default function WhyReal() {
  useDocumentTitle(
    'Why RIEAL — RIEAL H2O',
    'The four pillars behind RIEAL H2O — natural source, advanced purification, quality testing and eco-friendly packaging.'
  );

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="eyebrow">Why RIEAL H2O</span>
            <h1 className="page-hero__title heading-display">
              Purity you can <span className="text-royal">trust</span> — <br />
              built on four uncompromising pillars.
            </h1>
            <p className="page-hero__text">
              Trust is earned quietly, one bottle at a time. These four pillars
              are the promise behind every drop of RIEAL H2O.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="pillars section">
        <div className="container pillars__grid">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <PillarCard pillar={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reasons split */}
      <section className="reasons section section--tint">
        <div className="container reasons__grid">
          <Reveal from="left" className="reasons__visual">
            <div className="reasons__pill">
              <Bottle size={260} />
            </div>
          </Reveal>

          <Reveal from="right" className="reasons__body">
            <SectionHeading
              eyebrow="Why Customers Trust Us"
              title="The RIEAL difference"
              subtitle="A brand you notice by what stays consistent — the taste, the safety, the freshness."
            />

            <ul className="reasons__list">
              {reasons.map((r, i) => (
                <li key={r.title} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="reasons__check" aria-hidden="true"><Check size={16} /></span>
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section why-cta">
        <div className="container why-cta__inner">
          <Reveal>
            <h2 className="heading-display">Ready to make RIEAL your everyday water?</h2>
            <p>
              Whether it's a home subscription, an office cooler contract, an event
              or a distribution partnership — we'd love to talk.
            </p>
            <div className="why-cta__ctas">
              <Button to="/contact" size="lg">Get in Touch</Button>
              <Button to="/our-water" variant="secondary" size="lg" icon={false}>
                Our Water Journey
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
