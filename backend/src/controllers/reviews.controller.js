const db = require('../db');
const { createReview, validateReview } = require('../models/review.model');

const FILE = 'reviews.json';

function list(req, res) {
  const reviews = db.readData(FILE).sort((a, b) => new Date(b.date) - new Date(a.date));

  const average = reviews.length
    ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1))
    : 0;

  res.json({ reviews, average, count: reviews.length });
}

function create(req, res) {
  const errors = validateReview(req.body || {});
  if (errors.length) return res.status(400).json({ errors });

  const reviews = db.readData(FILE);
  const review = createReview(req.body);
  reviews.push(review);
  db.writeData(FILE, reviews);

  res.status(201).json({ review });
}

module.exports = { list, create };
