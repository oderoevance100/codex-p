// Sends an email when a new order comes in, IF SMTP credentials are set in
// .env. If they're not set, orders are still saved to disk — this just
// skips the email step instead of crashing the request.

const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  return transporter;
}

async function sendOrderNotification(order) {
  const t = getTransporter();
  const to = process.env.OWNER_EMAIL || 'oderoevance1003@gmail.com';

  if (!t) {
    console.log('[mailer] SMTP not configured — order saved to file only, no email sent.');
    return false;
  }

  await t.sendMail({
    from: `"Portfolio site" <${process.env.SMTP_USER}>`,
    to,
    replyTo: order.email,
    subject: `New project request: ${order.service}`,
    text: [
      `Name: ${order.name}`,
      `Email: ${order.email}`,
      `Service: ${order.service}`,
      `Timeline: ${order.timeline}`,
      '',
      'Project details:',
      order.details
    ].join('\n')
  });

  return true;
}

module.exports = { sendOrderNotification };
