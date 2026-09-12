import { Check, Droplets, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import Reveal from '../components/Reveal';

import Bottle from '../assets/svg/Bottle';
import HeroScene from '../assets/svg/HeroScene';

import useDocumentTitle from '../hooks/useDocumentTitle';
import './About.css';

const values = [
  { id: 'purity', icon: Droplets, title: 'Purity First',
    text: 'Every drop is sourced, purified and packed to preserve its natural clarity.' },
  { id: 'trust',  icon: ShieldCheck, title: 'Earning Trust',
    text: 'We commit to consistent quality — the same taste, the same standards, every time.' },
  { id: 'care',   icon: HeartHandshake, title: 'People-First',
    text: 'Homes, offices and communities — we treat every customer like our first.' },
  { id: 'planet', icon: Leaf, title: 'Kind to the Planet',
    text: 'We choose packaging and processes that protect the environment we all drink from.' },
];

const promises = [
  'Water drawn from carefully selected natural sources',
  'Multi-stage advanced purification',
  'Batch-level quality testing',
  'Hygienic, sealed packaging',
  'Consistent taste in every bottle',
  'Responsibly-sourced materials',
];

export default function About() {
  useDocumentTitle(
    'About Us — RIEAL H2O',
    'Learn about RIEAL H2O — our mission, sourcing philosophy and commitment to quality drinking water.'
  );

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="eyebrow">About RIEAL H2O</span>
            <h1 className="page-hero__title heading-display">
              A brand built on <span className="text-royal">purity</span>,
              <br />trust and everyday freshness.
            </h1>
            <p className="page-hero__text">
              RIEAL H2O is a premium packaged drinking water brand created to
              deliver purity, freshness and trust in every drop — for homes,
              offices and communities that care about what they drink.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story split */}
      <section className="story section">
        <div className="container story__grid">
          <Reveal from="left" className="story__visual">
            <div className="story__frame">
              <HeroScene className="story__scene" />
              <div className="story__bottle">
                <Bottle size={260} />
              </div>
            </div>
            <div className="story__badge">
              <strong>Nature-first</strong>
              <span>Sourced with care</span>
            </div>
          </Reveal>

          <Reveal from="right" className="story__body">
            <SectionHeading
              eyebrow="Our Story"
              title="More than water — a promise"
            />
            <p>
              RIEAL H2O began with a simple belief — that great drinking water
              should feel effortless. Sourced from clean natural sources, put
              through advanced purification and shipped in hygienic packaging,
              every bottle is a small promise kept.
            </p>
            <p>
              We built RIEAL H2O to be a brand you can trust with your
              breakfast table, your evening walk, your office cooler and the
              20-litre jar on your kitchen counter — because hydration should
              never be a compromise.
            </p>

            <ul className="story__promises">
              {promises.map((p) => (
                <li key={p}>
                  <span className="story__check" aria-hidden="true"><Check size={14} /></span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="values section section--tint">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="What We Stand For"
            title="Values that guide every bottle"
            subtitle="These are the principles that shape how we source, purify, pack and deliver RIEAL H2O."
          />

          <div className="values__grid">
            {values.map((v, i) => (
              <Reveal key={v.id} delay={i * 80}>
                <FeatureCard icon={v.icon} title={v.title} text={v.text} variant="card" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="about-cta section">
        <div className="container about-cta__inner">
          <Reveal>
            <h2 className="heading-display">
              Want to partner with RIEAL H2O?
            </h2>
            <p>
              We work with distributors, corporates, events and communities across
              India. Talk to us about how RIEAL H2O can be part of your everyday.
            </p>
            <Button to="/contact" size="lg">Start a Conversation</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
