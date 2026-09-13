import { Check, Droplets, ShieldCheck, HeartHandshake, Leaf, Target, Award, Users } from 'lucide-react';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import Reveal from '../components/Reveal';
import AnimatedCounter from '../components/AnimatedCounter';
import Accordion from '../components/Accordion';

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

const milestones = [
  { year: '2024', title: 'The Vision', text: 'RIEAL H2O was conceived with a single mission — to make pure, safe drinking water accessible to every household.' },
  { year: '2024', title: 'First Facility', text: 'Our first advanced purification facility was set up with state-of-the-art RO, UV and ozonisation technology.' },
  { year: '2025', title: 'Product Launch', text: 'RIEAL H2O officially launched with four pack sizes — 100 ml, 1 Litre, 2 Litre and the 20 Litre Jar.' },
  { year: '2025', title: 'Growing Together', text: 'Expanding our reach to homes, offices and events across the region with a focus on reliability and trust.' },
];

const aboutFaq = [
  { question: 'Where does RIEAL H2O source its water?', answer: 'We source water from carefully selected natural sources, chosen for their inherent purity. The exact location is protected to ensure continued quality and sustainability.' },
  { question: 'Is RIEAL H2O mineral water or purified water?', answer: 'RIEAL H2O is premium packaged drinking water. It goes through a multi-stage advanced purification process that removes impurities while maintaining a clean, crisp taste profile.' },
  { question: 'Does RIEAL H2O deliver to homes and offices?', answer: 'Yes! We offer delivery for all pack sizes. Reach out via our Contact page for home delivery schedules, office subscriptions, and bulk orders.' },
  { question: 'How can I become a distributor?', answer: 'We welcome distribution partnerships. Please use the Contact page to share your details and our team will get back to you within 24 hours to discuss the opportunity.' },
  { question: 'What makes RIEAL different from other water brands?', answer: 'RIEAL H2O is built on four pillars — natural sourcing, advanced purification, rigorous quality testing, and eco-friendly packaging. Every batch is independently tested before it reaches you.' },
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

      {/* ============================================================
          BRAND JOURNEY TIMELINE
          ============================================================ */}
      <section className="timeline section section--tint">
        <div className="container">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Our Journey"
              title="From vision to every drop"
              subtitle="The milestones that shaped RIEAL H2O into the brand it is today."
            />
          </Reveal>

          <div className="timeline__track">
            {milestones.map((m, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="timeline__item">
                  <div className="timeline__dot">
                    <span className="timeline__dot-inner" />
                  </div>
                  <div className="timeline__card">
                    <span className="timeline__year">{m.year}</span>
                    <h3 className="timeline__card-title">{m.title}</h3>
                    <p className="timeline__card-text">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values section">
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

      {/* ============================================================
          MISSION & VISION
          ============================================================ */}
      <section className="mission section section--tint">
        <div className="container mission__grid">
          <Reveal from="left">
            <div className="mission__card mission__card--mission">
              <div className="mission__icon-wrap">
                <Target size={28} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To deliver pure, safe and refreshing drinking water to every
                household, office and community — because clean hydration is a
                right, not a privilege. Every bottle we produce carries this
                commitment forward.
              </p>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="mission__card mission__card--vision">
              <div className="mission__icon-wrap">
                <Award size={28} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be India's most trusted packaged drinking water brand —
                recognised not for advertising, but for the consistent quality
                people experience every time they choose RIEAL H2O.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="container mission__counters">
          <Reveal delay={0}>
            <AnimatedCounter end={50000} suffix="+" label="Bottles Served" />
          </Reveal>
          <Reveal delay={100}>
            <AnimatedCounter end={4} label="Pack Sizes" />
          </Reveal>
          <Reveal delay={200}>
            <AnimatedCounter end={100} suffix="%" label="Quality Tested" />
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          ABOUT FAQ
          ============================================================ */}
      <section className="about-faq section">
        <div className="container about-faq__grid">
          <Reveal from="left" className="about-faq__intro">
            <SectionHeading
              eyebrow="Common Questions"
              title="Everything you want to know"
              subtitle="Have more questions? We'd love to hear from you — reach out via our Contact page."
            />
            <Button to="/contact" variant="outline">Ask Us Anything</Button>
          </Reveal>

          <Reveal from="right" className="about-faq__list">
            <Accordion items={aboutFaq} />
          </Reveal>
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
