import { Check, Shield, Zap, ThumbsUp, RefreshCw, BadgeCheck, Star } from 'lucide-react';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import PillarCard from '../components/PillarCard';
import Reveal from '../components/Reveal';
import AnimatedCounter from '../components/AnimatedCounter';
import MarqueeTicker from '../components/MarqueeTicker';

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

const brandPromises = [
  { icon: Shield, title: 'Batch-Verified Purity', text: 'Every batch passes lab testing before packaging. No exceptions, no shortcuts.' },
  { icon: Zap, title: 'Freshness Guaranteed', text: 'From our facility to your table in the shortest possible time — fresh water, always.' },
  { icon: RefreshCw, title: 'Consistent Quality', text: 'The same clean, crisp taste every single time you open a RIEAL H2O bottle.' },
  { icon: BadgeCheck, title: 'FSSAI Compliant', text: 'Our facility and products meet all FSSAI food safety and quality standards.' },
  { icon: ThumbsUp, title: 'Customer Satisfaction', text: 'We put customers first — from responsive support to reliable delivery.' },
  { icon: Star, title: 'Premium Experience', text: 'From packaging design to water quality — every detail is crafted for a premium experience.' },
];

const marqueeItems = [
  'Natural Source', 'Advanced Purification', 'Batch Tested', 'BPA-Free Packaging',
  'FSSAI Certified', 'Eco-Friendly', 'Trusted Quality', 'Fresh Always',
  'Family Safe', 'Crisp Taste', 'Zero Chlorine', 'pH Balanced',
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

      {/* ============================================================
          MARQUEE — Brand Keywords
          ============================================================ */}
      <section className="why-marquee">
        <MarqueeTicker items={marqueeItems} speed={32} />
      </section>

      {/* ============================================================
          BRAND PROMISES
          ============================================================ */}
      <section className="promises section section--tint">
        <div className="container">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="The RIEAL Promise"
              title="What we commit to, every bottle"
              subtitle="These aren't just claims — they're the standards we hold ourselves to, day after day."
            />
          </Reveal>

          <div className="promises__grid">
            {brandPromises.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="promises__card">
                  <div className="promises__icon">
                    <p.icon size={24} />
                  </div>
                  <h3 className="promises__card-title">{p.title}</h3>
                  <p className="promises__card-text">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          STAT COUNTERS
          ============================================================ */}
      <section className="why-stats section">
        <div className="container">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="By The Numbers"
              title="Trust is measured, not claimed"
              subtitle="These numbers reflect our commitment to purity and quality at every step."
            />
          </Reveal>

          <div className="why-stats__grid">
            <Reveal delay={0}>
              <AnimatedCounter end={5} label="Purification Stages" duration={1500} />
            </Reveal>
            <Reveal delay={100}>
              <AnimatedCounter end={100} suffix="%" label="Batch-Level Testing" duration={2000} />
            </Reveal>
            <Reveal delay={200}>
              <AnimatedCounter end={0} label="Chlorine (ppm)" duration={1000} />
            </Reveal>
            <Reveal delay={300}>
              <AnimatedCounter end={50000} suffix="+" label="Bottles Delivered" duration={2500} />
            </Reveal>
          </div>
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

      {/* ============================================================
          SATISFACTION GUARANTEE
          ============================================================ */}
      {/* <section className="guarantee section">
        <div className="container guarantee__inner">
          <Reveal>
            <div className="guarantee__badge" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="guarantee__seal">
                <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="6 4" />
                <circle cx="60" cy="60" r="46" fill="rgba(255,255,255,0.08)" />
              </svg>
              <BadgeCheck size={40} className="guarantee__seal-icon" />
            </div>
            <h2 className="heading-display guarantee__title">Our Quality Guarantee</h2>
            <p className="guarantee__text">
              We stand behind every bottle of RIEAL H2O. If you ever find our water
              quality below the standards we promise — consistent purity, balanced
              pH, zero chlorine, fresh taste — reach out to us and we'll make it right.
              That's not a policy; it's a principle.
            </p>
            <Button to="/contact" size="lg" className="guarantee__btn">
              Contact Our Team
            </Button>
          </Reveal>
        </div>
      </section> */}

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
