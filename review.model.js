function createReview({ name, rating, comment }) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: String(name).trim(),
    rating: Number(rating),
    comment: String(comment).trim(),
    date: new Date().toISOString()
  };
}

function validateReview({ name, rating, comment }) {
  const errors = [];
  if (!name || !String(name).trim()) errors.push('Name is required.');
  if (!comment || !String(comment).trim()) errors.push('Review text is required.');

  const r = Number(rating);
  if (!Number.isInteger(r) || r < 1 || r > 5) errors.push('Rating must be a whole number from 1 to 5.');

  return errors;
}

module.exports = { createReview, validateReview };
