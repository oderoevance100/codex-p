require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const reviewsRoutes = require('./src/routes/reviews.routes');
const ordersRoutes = require('./src/routes/orders.routes');
const notFound = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serves index.html / services.html directly, so the site and the API
// live on the same origin (http://localhost:3000) with no CORS setup
// needed. Point your real domain's static hosting at this same folder,
// or keep using this server to host both.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/reviews', reviewsRoutes);
app.use('/api/orders', ordersRoutes);

app.use('/api', notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
