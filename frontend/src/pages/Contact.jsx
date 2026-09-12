import { useState } from 'react';
import {
  Mail, Phone, MapPin, Clock,
  Loader2, AlertCircle, Send, PhoneCall, ArrowRight, Home as HomeIcon,
} from 'lucide-react';

import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

import { siteConfig } from '../data/siteConfig';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Contact.css';

const ENQUIRY_TYPES = [
  'General Enquiry',
  'Bulk Requirement',
  'Distribution',
  'Business Partnership',
  'Other',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  city: '',
  purpose: 'General Enquiry',
  message: '',
};

export default function Contact() {
  useDocumentTitle(
    'Contact — RIEAL H2O',
    'Get in touch with RIEAL H2O for enquiries, bulk requirements, distribution or partnerships.'
  );

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  // Remember the submitter's first name so the thank-you screen can greet them
  const [submittedName, setSubmittedName] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please tell us your name.';
    if (!form.email.trim()) {
      e.email = 'An email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'That email doesn’t look right.';
    }
    if (!form.phone.trim()) {
      e.phone = 'A phone number is required.';
    } else if (!/^[+()\-\s\d]{7,20}$/.test(form.phone)) {
      e.phone = 'That phone number doesn’t look right.';
    }
    if (!form.message.trim()) {
      e.message = 'Please share a short message.';
    } else if (form.message.trim().length < 10) {
      e.message = 'Please add a bit more detail (min. 10 characters).';
    }
    return e;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus({ state: 'loading', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      let data = null;
      try { data = await res.json(); } catch { /* non-JSON */ }

      if (res.ok && data?.ok) {
        setSubmittedName(form.name.trim().split(/\s+/)[0] || '');
        setStatus({ state: 'success', message: '' });
        setForm(initialForm);
      } else {
        throw new Error(
          data?.message ||
          `We couldn't send your message (${res.status}). Please try again.`
        );
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: err?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const resetForm = () => {
    setStatus({ state: 'idle', message: '' });
    setSubmittedName('');
  };

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="eyebrow">We'd love to hear from you</span>
            <h1 className="page-hero__title heading-display">
              Let's talk <span className="text-royal">RIEAL H2O</span>.
            </h1>
            <p className="page-hero__text">
              Enquiries, bulk requirements, distribution and partnerships —
              tell us what you need and our team will get back within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact body */}
      <section className="contact section">
        <div className="container contact__grid">
          {/* Info sidebar */}
          <Reveal from="left" className="contact__info">
            <SectionHeading
              eyebrow="Reach Us"
              title="Talk to our team"
              subtitle="Prefer email or phone? Reach us directly using the details below."
            />

            <ul className="contact__list">
              <li>
                <span className="contact__icon" aria-hidden="true"><Mail size={18} /></span>
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </div>
              </li>
              <li>
                <span className="contact__icon" aria-hidden="true"><Phone size={18} /></span>
                <div>
                  <strong>Phone</strong>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}>
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>
              <li>
                <span className="contact__icon" aria-hidden="true"><MapPin size={18} /></span>
                <div>
                  <strong>Address</strong>
                  <span>{siteConfig.contact.address}</span>
                </div>
              </li>
              <li>
                <span className="contact__icon" aria-hidden="true"><Clock size={18} /></span>
                <div>
                  <strong>Hours</strong>
                  <span>{siteConfig.contact.hours}</span>
                </div>
              </li>
            </ul>

            <div className="contact__promise">
              <strong>Our promise</strong>
              <p>Every enquiry gets a personal response — usually within 24 hours.</p>
            </div>
          </Reveal>

          {/* Form / Success */}
          <Reveal from="right" className="contact__form-wrap">
            {status.state === 'success' ? (
              <SuccessScreen name={submittedName} onReset={resetForm} />
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="contact__row contact__row--2">
                  <Field
                    label="Full Name" name="name"
                    value={form.name} onChange={handleChange}
                    error={errors.name} required
                  />
                  <Field
                    label="Email Address" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    error={errors.email} required
                  />
                </div>

                <div className="contact__row contact__row--2">
                  <Field
                    label="Phone Number" name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    error={errors.phone} required
                  />
                  <Field
                    label="Company / Organization" name="company"
                    value={form.company} onChange={handleChange}
                    error={errors.company}
                  />
                </div>

                <div className="contact__row contact__row--2">
                  <Field
                    label="City" name="city"
                    value={form.city} onChange={handleChange}
                    error={errors.city}
                  />

                  <div className="field">
                    <label htmlFor="purpose">Purpose of Enquiry</label>
                    <select
                      id="purpose" name="purpose"
                      value={form.purpose} onChange={handleChange}
                    >
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field field--full">
                  <label htmlFor="message">
                    Message <span className="field__required" aria-hidden>*</span>
                  </label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={form.message} onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                    placeholder="Tell us about your enquiry — quantities, timelines, location, anything useful."
                  />
                  {errors.message && (
                    <p id="err-message" className="field__error" role="alert">
                      <AlertCircle size={14} /> {errors.message}
                    </p>
                  )}
                </div>

                {status.state === 'error' && (
                  <div className="contact__banner contact__banner--error" role="alert">
                    <AlertCircle size={18} />
                    <span>{status.message}</span>
                  </div>
                )}

                <div className="contact__submit-row">
                  <button
                    type="submit"
                    className="btn btn--primary btn--lg contact__submit"
                    disabled={status.state === 'loading'}
                    aria-disabled={status.state === 'loading'}
                  >
                    {status.state === 'loading' ? (
                      <>
                        <Loader2 className="contact__spin" size={18} />
                        <span className="btn__label">Sending…</span>
                      </>
                    ) : (
                      <>
                        <span className="btn__label">Send Enquiry</span>
                        <span className="btn__icon" aria-hidden="true">
                          <Send size={16} />
                        </span>
                      </>
                    )}
                  </button>

                  <p className="contact__fineprint">
                    Your details are used only to respond to this enquiry — nothing is stored.
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* -------------------- Success screen -------------------- */
function SuccessScreen({ name, onReset }) {
  return (
    <div className="success" role="status" aria-live="polite">
      {/* Animated water-drop → check burst */}
      <div className="success__visual" aria-hidden="true">
        <span className="success__ring success__ring--1" />
        <span className="success__ring success__ring--2" />
        <span className="success__ring success__ring--3" />

        <span className="success__drop">
          {/* Custom check svg so we can animate the stroke */}
          <svg viewBox="0 0 48 48" width="34" height="34" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M12 25 L21 34 L37 16"
              stroke="#fff"
              strokeWidth="4"
              className="success__check-path"
            />
          </svg>
        </span>

        {/* Rising droplets */}
        <span className="success__floater success__floater--a" />
        <span className="success__floater success__floater--b" />
        <span className="success__floater success__floater--c" />
        <span className="success__floater success__floater--d" />
        <span className="success__floater success__floater--e" />
      </div>

      <h2 className="success__title heading-display">
        {name ? `Thanks, ${name}!` : 'Thanks so much!'}
        <br />
        <span className="text-royal">Your message is on its way.</span>
      </h2>

      <p className="success__text">
        We've received your enquiry and our team will get back to you within
        <strong> 24 hours</strong>. Meanwhile, a copy is on its way to your inbox.
      </p>

      {/* Direct contact card */}
      <div className="success__card">
        <div className="success__card-head">
          <span className="success__card-eyebrow">Need us right now?</span>
          <span className="success__card-title">Talk to the team directly</span>
        </div>

        <div className="success__card-actions">
          <a
            className="success__cta success__cta--primary"
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
          >
            <PhoneCall size={16} />
            <span>{siteConfig.contact.phone}</span>
          </a>
          <a
            className="success__cta success__cta--secondary"
            href={`mailto:${siteConfig.contact.email}`}
          >
            <Mail size={16} />
            <span>{siteConfig.contact.email}</span>
          </a>
        </div>
      </div>

      <div className="success__foot">
        <button type="button" className="success__reset" onClick={onReset}>
          <ArrowRight size={16} />
          <span>Send another message</span>
        </button>
        <a href="/" className="success__home">
          <HomeIcon size={14} /> <span>Back to home</span>
        </a>
      </div>
    </div>
  );
}

/* -------------------- Small field primitive -------------------- */
function Field({ label, name, type = 'text', value, onChange, error, required = false }) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}{required && <span className="field__required" aria-hidden>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `err-${name}` : undefined}
        autoComplete={autocompleteFor(name, type)}
      />
      {error && (
        <p id={`err-${name}`} className="field__error" role="alert">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

function autocompleteFor(name, type) {
  if (name === 'name') return 'name';
  if (name === 'email' || type === 'email') return 'email';
  if (name === 'phone' || type === 'tel') return 'tel';
  if (name === 'company') return 'organization';
  if (name === 'city') return 'address-level2';
  return 'off';
}
