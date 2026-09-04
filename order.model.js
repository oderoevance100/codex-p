const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createOrder({ name, email, service, timeline, details }) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: String(name).trim(),
    email: String(email).trim(),
    service: String(service).trim(),
    timeline: timeline ? String(timeline).trim() : 'Flexible',
    details: String(details).trim(),
    status: 'new',
    date: new Date().toISOString()
  };
}

function validateOrder({ name, email, service, details }) {
  const errors = [];
  if (!name || !String(name).trim()) errors.push('Name is required.');
  if (!email || !EMAIL_RE.test(String(email).trim())) errors.push('A valid email is required.');
  if (!service || !String(service).trim()) errors.push('Service is required.');
  if (!details || !String(details).trim()) errors.push('Project details are required.');
  return errors;
}

module.exports = { createOrder, validateOrder };
