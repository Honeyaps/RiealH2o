import { useState } from 'react';
import { Droplets, Beaker, FlaskConical, Sparkles, GlassWater } from 'lucide-react';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import ProcessStep from '../components/ProcessStep';
import Reveal from '../components/Reveal';
import ComparisonBar from '../components/ComparisonBar';
import Accordion from '../components/Accordion';
import AnimatedCounter from '../components/AnimatedCounter';

import { waterJourney } from '../data/features';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './OurWater.css';

const qualityParams = [
  { label: 'Purity Index', value: 99, max: 100, display: '99%' },
  { label: 'TDS Level', value: 65, max: 100, display: '50–80 ppm (Optimal)' },
  { label: 'pH Balance', value: 72, max: 100, display: '7.0–7.5 (Neutral)' },
  { label: 'Chlorine', value: 0, max: 100, display: '0 ppm (Zero)' },
  { label: 'Bacterial Count', value: 0, max: 100, display: '0 CFU (Sterile)' },
];

const waterFaq = [
  { question: 'What purification technology does RIEAL H2O use?', answer: 'We use a multi-stage system that combines Reverse Osmosis (RO), Ultra-Violet (UV) sterilisation, ozonisation, and activated carbon filtration. Each stage targets different types of impurities to deliver consistently pure water.' },
  { question: 'What is TDS and why does it matter?', answer: 'TDS (Total Dissolved Solids) measures the minerals and salts dissolved in water, expressed in parts per million (ppm). RIEAL H2O maintains a TDS range of 50–80 ppm — low enough for purity, high enough for a pleasant, crisp taste.' },
  { question: 'Is the packaging BPA-free?', answer: 'Yes. All RIEAL H2O bottles and jars use food-grade, BPA-free packaging that meets FSSAI standards. Our 20L jars are made from durable, reusable food-safe material.' },
  { question: 'How often is the water tested?', answer: 'Every single batch is tested before packaging. We run physical, chemical and microbiological tests to ensure every bottle meets our strict quality benchmarks — no batch ships without passing all checks.' },
  { question: 'What is the shelf life of RIEAL H2O?', answer: 'When stored in a cool, dry place away from direct sunlight, RIEAL H2O has a shelf life of 6 months from the date of packaging. Each bottle is printed with a best-before date for your reference.' },
  { question: 'Can I see the purification process?', answer: 'We believe in transparency. If you are a potential distributor or a large-volume customer, we welcome facility visits. Reach out through our Contact page to schedule a visit.' },
];

const techSpecs = [
  { icon: FlaskConical, title: 'Reverse Osmosis', text: 'Removes dissolved salts, heavy metals and microscopic contaminants through a semi-permeable membrane.' },
  { icon: Sparkles, title: 'UV Sterilisation', text: 'Ultra-violet light destroys bacteria and viruses without adding chemicals, preserving the water’s natural taste.' },
  { icon: Beaker, title: 'Ozonisation', text: 'Ozone gas neutralises any remaining micro-organisms and oxidises organic matter for absolute purity.' },
  { icon: GlassWater, title: 'Carbon Filtration', text: 'Activated carbon absorbs residual odours, chlorine and organic compounds, leaving water crisp and clean.' },
];

export default function OurWater() {
  useDocumentTitle(
    'Our Water — RIEAL H2O',
    'From natural source to safe packaging — see the RIEAL H2O water journey and quality process.'
  );

  // Hydration calculator state
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('moderate');

  const multiplier = { low: 0.033, moderate: 0.04, high: 0.045 };
  const recommended = weight ? (parseFloat(weight) * multiplier[activity]).toFixed(1) : null;

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

      {/* ============================================================
          PURIFICATION TECHNOLOGY
          ============================================================ */}
      <section className="tech section section--tint">
        <div className="container">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Our Technology"
              title="Four stages of advanced purification"
              subtitle="Each stage targets specific impurities — together they deliver water that's consistently pure, safe and refreshing."
            />
          </Reveal>

          <div className="tech__grid">
            {techSpecs.map((spec, i) => (
              <Reveal key={spec.title} delay={i * 100}>
                <div className="tech__card">
                  <div className="tech__icon-wrap">
                    <spec.icon size={26} />
                  </div>
                  <h3 className="tech__card-title">{spec.title}</h3>
                  <p className="tech__card-text">{spec.text}</p>
                  <span className="tech__step-badge">Stage {i + 1}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality panel */}
      <section className="quality section">
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

      {/* ============================================================
          WATER QUALITY COMPARISON
          ============================================================ */}
      <section className="comparison section section--tint">
        <div className="container comparison__grid">
          <Reveal from="left" className="comparison__intro">
            <SectionHeading
              eyebrow="Quality Parameters"
              title="What's in your RIEAL H2O"
              subtitle="Real numbers from our lab tests — because transparency is part of our commitment to you."
            />
          </Reveal>

          <Reveal from="right" className="comparison__bars">
            {qualityParams.map((p) => (
              <ComparisonBar
                key={p.label}
                label={p.label}
                value={p.value}
                max={p.max}
                display={p.display}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          HYDRATION CALCULATOR
          ============================================================ */}
      <section className="calc section">
        <div className="container calc__grid">
          <Reveal from="left" className="calc__content">
            <SectionHeading
              eyebrow="Daily Hydration"
              title="How much water do you need?"
              subtitle="Use this quick calculator to find your daily recommended water intake."
            />

            <div className="calc__form">
              <div className="calc__field">
                <label className="calc__label" htmlFor="calc-weight">Your weight (kg)</label>
                <input
                  id="calc-weight"
                  type="number"
                  className="calc__input"
                  placeholder="e.g. 65"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="20"
                  max="250"
                />
              </div>

              <div className="calc__field">
                <label className="calc__label">Activity level</label>
                <div className="calc__pills">
                  {['low', 'moderate', 'high'].map((level) => (
                    <button
                      key={level}
                      className={`calc__pill ${activity === level ? 'is-active' : ''}`}
                      onClick={() => setActivity(level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal from="right" className="calc__result-wrap">
            <div className="calc__result">
              {recommended ? (
                <>
                  <span className="calc__result-num">{recommended}L</span>
                  <span className="calc__result-label">recommended daily intake</span>
                  <p className="calc__result-note">
                    That's about <strong>{Math.ceil(recommended / 0.25)} glasses</strong> of
                    water per day. Stay hydrated with RIEAL H2O!
                  </p>
                </>
              ) : (
                <>
                  <GlassWater size={48} className="calc__result-icon" />
                  <span className="calc__result-label">Enter your weight to get started</span>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          WATER FAQ
          ============================================================ */}
      <section className="water-faq section section--tint">
        <div className="container water-faq__grid">
          <Reveal from="left" className="water-faq__intro">
            <SectionHeading
              eyebrow="Questions Answered"
              title="About our water"
              subtitle="Transparent answers to the questions people ask most."
            />
            <Button to="/contact" variant="outline">Ask More</Button>
          </Reveal>

          <Reveal from="right" className="water-faq__list">
            <Accordion items={waterFaq} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
