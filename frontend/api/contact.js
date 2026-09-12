// ==================================================================
//  RIEAL H2O — Contact form serverless function (Vercel + Nodemailer)
// ------------------------------------------------------------------
//  Runs on every POST to /api/contact. Sends TWO emails and stores
//  NOTHING:
//    1. To the business manager — the full form data + reply-to set
//       to the customer so a plain "Reply" reaches them.
//    2. To the customer — a warm thank-you with the manager's direct
//       phone & email so they can reach out immediately if they want.
//
//  Configure with these Vercel Project → Environment Variables:
//    SMTP_HOST         (default: smtp.gmail.com)
//    SMTP_PORT         (default: 465 — SSL. Use 587 for STARTTLS)
//    SMTP_USER         (Gmail/other SMTP account used to send)
//    SMTP_PASS         (Gmail App Password — NOT your account password)
//    MANAGER_EMAIL     (where enquiries land)
//    MANAGER_PHONE     (shown in the client's thank-you email)
//    MANAGER_NAME      (optional — default "RIEAL H2O Team")
//    BUSINESS_ADDRESS  (optional — shown in client's thank-you email)
// ==================================================================

import nodemailer from 'nodemailer';

const BRAND = 'RIEAL H2O';
const TAGLINE = 'Pure Water. Better Tomorrow.';

// Basic HTML-escape so nothing in the form body can break the email
const esc = (v = '') =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

// Best-effort client IP (Vercel puts it in x-forwarded-for)
const clientIp = (req) =>
  (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';

export default async function handler(req, res) {
  // CORS / method guard — allow same-origin POST only
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const body = req.body || {};
  const {
    name = '',
    email = '',
    phone = '',
    company = '',
    city = '',
    purpose = 'General Enquiry',
    message = '',
    botcheck = '',
  } = body;

  // Honeypot — quietly pretend success so bots don't retry
  if (botcheck) return res.status(200).json({ ok: true });

  // ---------------- Validation ----------------
  const errors = [];
  if (!String(name).trim()) errors.push('Name is required.');
  if (!String(email).trim()) errors.push('Email is required.');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push('Email is not valid.');
  if (!String(phone).trim()) errors.push('Phone is required.');
  else if (!/^[+()\-\s\d]{7,20}$/.test(phone)) errors.push('Phone is not valid.');
  if (!String(message).trim() || String(message).trim().length < 10)
    errors.push('Message must be at least 10 characters.');

  if (errors.length) {
    return res.status(400).json({ ok: false, message: errors.join(' ') });
  }

  // ---------------- SMTP config ----------------
  const {
    SMTP_HOST = 'smtp.gmail.com',
    SMTP_PORT = '465',
    SMTP_USER,
    SMTP_PASS,
    MANAGER_EMAIL,
    MANAGER_PHONE = '',
    MANAGER_NAME = 'RIEAL H2O Team',
    BUSINESS_ADDRESS = '',
  } = process.env;

  if (!SMTP_USER || !SMTP_PASS || !MANAGER_EMAIL) {
    console.error('[/api/contact] Missing SMTP or MANAGER_EMAIL env vars.');
    return res.status(500).json({
      ok: false,
      message: 'The contact service is not configured yet. Please try again shortly.',
    });
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // SSL on 465, STARTTLS on 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // ---------------- Manager email (full details) ----------------
  const managerSubject = `[RIEAL H2O] ${purpose} — ${name}`;
  const managerText = [
    `New enquiry from the RIEAL H2O website.`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone}`,
    `Company: ${company || '—'}`,
    `City:    ${city || '—'}`,
    `Purpose: ${purpose}`,
    ``,
    `Message:`,
    message,
    ``,
    `— Submitted from RIEAL H2O website · IP ${clientIp(req)}`,
  ].join('\n');

  const managerHtml = `<!doctype html>
<html><body style="margin:0;padding:0;background:#F4FBFF;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0A1A2F;">
  <div style="max-width:640px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(6,43,102,0.08);">
    <div style="background:linear-gradient(135deg,#087FEF 0%,#062B66 100%);padding:28px 32px;color:#fff;">
      <div style="font-size:12px;font-weight:600;letter-spacing:.3em;opacity:.8;">NEW WEBSITE ENQUIRY</div>
      <div style="font-size:22px;font-weight:800;margin-top:8px;">${esc(purpose)}</div>
      <div style="font-size:14px;margin-top:6px;opacity:.85;">from ${esc(name)}</div>
    </div>
    <div style="padding:28px 32px;">
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#55688A;width:110px;">Name</td><td style="padding:8px 0;font-weight:600;">${esc(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#55688A;">Email</td><td style="padding:8px 0;"><a href="mailto:${esc(email)}" style="color:#087FEF;text-decoration:none;font-weight:600;">${esc(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#55688A;">Phone</td><td style="padding:8px 0;"><a href="tel:${esc(phone)}" style="color:#087FEF;text-decoration:none;font-weight:600;">${esc(phone)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#55688A;">Company</td><td style="padding:8px 0;">${esc(company) || '<span style="color:#7B8CAA;">—</span>'}</td></tr>
        <tr><td style="padding:8px 0;color:#55688A;">City</td><td style="padding:8px 0;">${esc(city) || '<span style="color:#7B8CAA;">—</span>'}</td></tr>
        <tr><td style="padding:8px 0;color:#55688A;">Purpose</td><td style="padding:8px 0;font-weight:600;color:#062B66;">${esc(purpose)}</td></tr>
      </table>

      <div style="margin-top:20px;padding:20px;background:#F4FBFF;border-left:4px solid #087FEF;border-radius:8px;">
        <div style="font-size:12px;color:#55688A;text-transform:uppercase;letter-spacing:.15em;font-weight:600;margin-bottom:8px;">Message</div>
        <div style="white-space:pre-wrap;line-height:1.65;">${esc(message)}</div>
      </div>

      <div style="margin-top:24px;">
        <a href="mailto:${esc(email)}?subject=Re:%20Your%20RIEAL%20H2O%20enquiry"
           style="display:inline-block;padding:12px 22px;background:linear-gradient(135deg,#087FEF,#0F63C2);color:#fff;text-decoration:none;border-radius:999px;font-weight:600;font-size:14px;">
          Reply to ${esc(name.split(' ')[0])}
        </a>
        <a href="tel:${esc(phone)}"
           style="display:inline-block;margin-left:8px;padding:12px 22px;background:#fff;color:#062B66;text-decoration:none;border:1.5px solid #E4EEF9;border-radius:999px;font-weight:600;font-size:14px;">
          Call
        </a>
      </div>
    </div>
    <div style="padding:16px 32px;background:#F4FBFF;color:#7B8CAA;font-size:12px;">
      Submitted from the RIEAL H2O website · IP ${esc(clientIp(req))}
    </div>
  </div>
</body></html>`;

  // ---------------- Client email (auto-reply) ----------------
  const firstName = String(name).trim().split(/\s+/)[0];
  const clientSubject = `Thank you for contacting ${BRAND}`;

  const managerLine = MANAGER_PHONE
    ? `Or reach ${MANAGER_NAME} directly on ${MANAGER_PHONE}`
    : `Or write directly to ${MANAGER_EMAIL}`;

  const clientText = [
    `Hi ${firstName},`,
    ``,
    `Thank you for reaching out to ${BRAND}!`,
    ``,
    `We've received your enquiry and our team will get back to you within 24 hours.`,
    ``,
    `${managerLine}`,
    `Email: ${MANAGER_EMAIL}`,
    ``,
    `Here's a copy of what you shared with us:`,
    `• Purpose: ${purpose}`,
    `• Message: ${message}`,
    ``,
    `Warm regards,`,
    `${MANAGER_NAME}`,
    `${BRAND} — ${TAGLINE}`,
    BUSINESS_ADDRESS ? BUSINESS_ADDRESS : '',
  ].filter(Boolean).join('\n');

  const clientHtml = `<!doctype html>
<html><body style="margin:0;padding:0;background:#F4FBFF;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0A1A2F;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(6,43,102,0.1);">

    <div style="background:linear-gradient(135deg,#087FEF 0%,#062B66 100%);padding:44px 32px 36px;color:#fff;text-align:center;position:relative;">
      <div style="display:inline-block;width:64px;height:64px;background:rgba(255,255,255,0.15);border-radius:50%;margin-bottom:16px;line-height:64px;font-size:32px;">💧</div>
      <div style="font-size:12px;font-weight:600;letter-spacing:.34em;opacity:.85;">RIEAL H2O</div>
      <div style="font-size:26px;font-weight:800;margin-top:12px;letter-spacing:-0.5px;">Your message is on its way!</div>
      <div style="font-size:14px;margin-top:8px;opacity:.85;">${esc(TAGLINE)}</div>
    </div>

    <div style="padding:36px 34px 8px;font-size:15px;line-height:1.75;">
      <div style="font-size:17px;font-weight:600;color:#062B66;margin-bottom:14px;">Hi ${esc(firstName)},</div>
      <p style="margin:0 0 14px;">
        Thanks so much for reaching out to <strong>${BRAND}</strong>. We've
        received your enquiry and our team will get back to you within
        <strong>24 hours</strong>.
      </p>
      <p style="margin:0 0 22px;color:#55688A;">
        In the meantime, if you'd like to speak to us right now, you can
        reach out directly using the details below.
      </p>

      <div style="padding:22px 24px;background:linear-gradient(180deg,#F4FBFF 0%,#DFF3FF 100%);border-radius:14px;border:1px solid #E4EEF9;">
        <div style="font-size:11px;font-weight:700;color:#55688A;letter-spacing:.24em;text-transform:uppercase;margin-bottom:12px;">Talk to us directly</div>
        <div style="font-size:16px;font-weight:700;color:#062B66;margin-bottom:6px;">${esc(MANAGER_NAME)}</div>
        ${MANAGER_PHONE ? `<div style="margin:6px 0;"><a href="tel:${esc(MANAGER_PHONE)}" style="color:#087FEF;text-decoration:none;font-weight:600;">📞 ${esc(MANAGER_PHONE)}</a></div>` : ''}
        <div style="margin:6px 0;"><a href="mailto:${esc(MANAGER_EMAIL)}" style="color:#087FEF;text-decoration:none;font-weight:600;">✉️ ${esc(MANAGER_EMAIL)}</a></div>
      </div>

      <div style="margin-top:26px;padding:18px 20px;background:#F4FBFF;border-left:4px solid #087FEF;border-radius:8px;">
        <div style="font-size:11px;font-weight:700;color:#55688A;letter-spacing:.24em;text-transform:uppercase;margin-bottom:8px;">Your enquiry — as we received it</div>
        <div style="font-size:14px;color:#0A1A2F;margin-bottom:6px;"><strong>Purpose:</strong> ${esc(purpose)}</div>
        <div style="font-size:14px;color:#0A1A2F;white-space:pre-wrap;line-height:1.6;"><strong>Message:</strong><br/>${esc(message)}</div>
      </div>
    </div>

    <div style="padding:24px 34px 36px;text-align:center;">
      <div style="color:#55688A;font-size:13px;line-height:1.7;">
        Warm regards,<br/>
        <strong style="color:#062B66;">${esc(MANAGER_NAME)}</strong>
      </div>
      <div style="margin-top:22px;padding-top:20px;border-top:1px solid #E4EEF9;color:#7B8CAA;font-size:12px;">
        © ${new Date().getFullYear()} ${BRAND}. ${esc(TAGLINE)}
        ${BUSINESS_ADDRESS ? `<br/><span style="color:#7B8CAA;">${esc(BUSINESS_ADDRESS)}</span>` : ''}
      </div>
    </div>
  </div>
</body></html>`;

  // ---------------- Send ----------------
  try {
    // Send manager notification first (it's the mission-critical one) —
    // if it succeeds, the enquiry is captured. Then fire the auto-reply.
    await transporter.sendMail({
      from: `"RIEAL H2O Website" <${SMTP_USER}>`,
      to: MANAGER_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: managerSubject,
      text: managerText,
      html: managerHtml,
    });

    // Auto-reply — don't fail the whole request if this bounces
    try {
      await transporter.sendMail({
        from: `"${MANAGER_NAME}" <${SMTP_USER}>`,
        to: `"${name}" <${email}>`,
        replyTo: MANAGER_EMAIL,
        subject: clientSubject,
        text: clientText,
        html: clientHtml,
      });
    } catch (replyErr) {
      console.warn('[/api/contact] Auto-reply failed:', replyErr?.message);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[/api/contact] Send failed:', err);
    return res.status(500).json({
      ok: false,
      message:
        'We could not send your message right now. Please try again in a moment, or email us directly.',
    });
  }
}
