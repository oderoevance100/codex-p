const db = require('../db');
const { createOrder, validateOrder } = require('../models/order.model');
const { sendOrderNotification } = require('../utils/mailer');

const FILE = 'orders.json';

// Admin-only: list submitted requests. Requires the x-admin-key header to
// match ADMIN_KEY from .env, so the order list (with customer emails) isn't
// publicly readable.
function list(req, res) {
  const key = req.header('x-admin-key');
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const orders = db.readData(FILE).sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ orders });
}

async function create(req, res) {
  const errors = validateOrder(req.body || {});
  if (errors.length) return res.status(400).json({ errors });

  const orders = db.readData(FILE);
  const order = createOrder(req.body);
  orders.push(order);
  db.writeData(FILE, orders);

  let emailed = false;
  try {
    emailed = await sendOrderNotification(order);
  } catch (err) {
    console.error('[mailer] failed to send notification:', err.message);
  }

  res.status(201).json({ order: { id: order.id, service: order.service, date: order.date }, emailed });
}

module.exports = { list, create };
