import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import PillarCard from '../components/PillarCard';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

import Bottle from '../assets/svg/Bottle';
import WaterSplash from '../assets/svg/WaterSplash';
import HeroScene from '../assets/svg/HeroScene';
import WaveDivider from '../assets/svg/WaveDivider';

import { siteConfig } from '../data/siteConfig';
import { trustFeatures, pillars } from '../data/features';
import { products } from '../data/products';
import useDocumentTitle from '../hooks/useDocumentTitle';

import './Home.css';

export default function Home() {
  useDocumentTitle(
    'RIEAL H2O | Pure Water. Better Tomorrow.',
    "RIEAL H2O — Nature's purity in every drop. Premium packaged drinking water crafted for a healthier tomorrow."
  );

  // Subtle parallax for hero bottle
  const heroRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="hero" ref={heroRef}>
        <div className="hero__scene" aria-hidden="true">
          <HeroScene className="hero__scene-svg" />
          <div className="hero__scene-fade" />
        </div>

        <div className="container hero__inner">
          <motion.div
            className="hero__content"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
          >
            <motion.span
              className="hero__eyebrow"
              variants={fadeUp}
            >
              <span className="hero__dot" /> PURE
              <span className="hero__dot" /> SAFE
              <span className="hero__dot" /> HEALTHY
            </motion.span>

            <motion.h1
              className="hero__title"
              variants={fadeUp}
            >
              RIEAL
              <span className="hero__title-accent">
                H<sub>2</sub>O
                <svg className="hero__droplet" viewBox="0 0 40 60" aria-hidden="true">
                  <defs>
                    <linearGradient id="heroDropG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4FB0FF" />
                      <stop offset="100%" stopColor="#087FEF" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 2 C 26 16, 34 26, 34 36 A 14 14 0 1 1 6 36 C 6 26, 14 16, 20 2 Z"
                    fill="url(#heroDropG)"
                  />
                  <ellipse cx="14" cy="34" rx="3" ry="5" fill="#fff" opacity="0.55" />
                </svg>
              </span>
            </motion.h1>

            <motion.h2 className="hero__headline" variants={fadeUp}>
              Nature's Purity,<br />In Every Drop
            </motion.h2>

            <motion.p className="hero__supporting" variants={fadeUp}>
              {siteConfig.brand.supporting}
            </motion.p>

            <motion.div className="hero__ctas" variants={fadeUp}>
              <Button to="/our-water" size="lg">{siteConfig.cta.primary}</Button>
              <Button to="/contact" variant="secondary" size="lg" icon={false}>
                {siteConfig.cta.secondary}
              </Button>
            </motion.div>
          </motion.div>

          {/* Bottle */}
          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: `translateY(${-Math.min(scroll * 0.12, 60)}px)` }}
          >
            <div className="hero__splash">
              <WaterSplash />
            </div>

            <div className="hero__bottle-wrap">
              <Bottle className="hero__bottle" />

              <motion.span
                className="hero__script"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
              >
                Pure
                <br />
                By Nature
                <svg viewBox="0 0 160 20" className="hero__script-line" aria-hidden="true">
                  <path
                    d="M2 12 Q 40 2, 80 10 T 158 8"
                    stroke="#087FEF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </motion.span>
            </div>

            {/* Floating droplets */}
            <span className="hero__float hero__float--a" />
            <span className="hero__float hero__float--b" />
            <span className="hero__float hero__float--c" />
          </motion.div>
        </div>

        {/* Scroll indicator
        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-track">
            <span className="hero__scroll-dot" />
          </span>
          <span className="hero__scroll-label">Scroll</span>
        </div> */}
      </section>

      {/* ============================================================
          TRUST ROW
          ============================================================ */}
      <section className="trust">
        <div className="container trust__grid">
          {trustFeatures.map((f, i) => (
            <Reveal key={f.id} delay={i * 80}>
              <FeatureCard icon={f.icon} title={f.title} text={f.text} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================
          ABOUT SPLIT
          ============================================================ */}
      <section className="about-split section">
        <div className="container about-split__grid">
          <Reveal from="left" className="about-split__visual">
            <div className="about-split__scene">
              <HeroScene className="about-split__scene-svg" />
            </div>
            <div className="about-split__bottle-wrap">
              <Bottle className="about-split__bottle" />
              <span className="script about-split__script">
                Pure<br />Fresh<br />Real
                <svg viewBox="0 0 120 16" className="about-split__script-line" aria-hidden="true">
                  <path
                    d="M2 10 Q 30 2, 60 8 T 118 6"
                    stroke="#062B66"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </div>
          </Reveal>

          <Reveal from="right" className="about-split__content">
            <SectionHeading
              eyebrow="About RIEAL H2O"
              title="More Than Just Water"
              subtitle="RIEAL H2O is a premium packaged drinking water brand, crafted to give you the purest hydration experience."
            />
            <p className="about-split__body">
              We source water from natural, pristine sources and put it through
              advanced purification and rigorous quality checks — so every bottle
              delivers freshness you can taste and safety you can trust.
            </p>
            <Button to="/about" variant="outline">Discover Our Story</Button>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          PURITY / PILLARS
          ============================================================ */}
      <section className="purity section section--tint">
        <div className="container purity__grid">
          <Reveal className="purity__intro">
            <SectionHeading
              eyebrow="Why Choose RIEAL H2O"
              title="Purity You Can Trust"
              subtitle="We go the extra mile to ensure every drop meets the highest standards of quality, safety and freshness."
            />
            <Button to="/why-real" className="purity__cta">Our Quality</Button>
          </Reveal>

          <div className="purity__pillars">
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <PillarCard pillar={p} compact />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Decorative wave at right edge */}
        <svg className="purity__wave" viewBox="0 0 800 200" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 130 C 150 80, 300 180, 460 120 C 620 60, 720 140, 800 100 L 800 200 L 0 200 Z"
            fill="#087FEF"
            opacity="0.14"
          />
          <path
            d="M0 160 C 160 110, 320 200, 480 140 C 640 80, 740 170, 800 130 L 800 200 L 0 200 Z"
            fill="#087FEF"
            opacity="0.22"
          />
        </svg>
      </section>

      {/* ============================================================
          PRODUCTS
          ============================================================ */}
      <section className="products section">
        <div className="container">
          <SectionHeading
            eyebrow="Our Products"
            title="Choose Your Pack"
            subtitle="From on-the-go singles to the family jar — the right RIEAL H2O for every moment."
          />

          <div className="products__grid">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA BAND
          ============================================================ */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <div className="cta-band__text">
            <h2 className="heading-display">
              Ready to bring purity <br /> to your everyday?
            </h2>
            <p>
              Talk to us about home delivery, office subscriptions, events,
              distribution or partnerships.
            </p>
          </div>
          <Button to="/contact" size="lg" className="cta-band__btn">
            Get in Touch
          </Button>
        </div>

        <WaveDivider color="#062B66" className="cta-band__wave" />
      </section>
    </>
  );
}

/* Framer variants */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
