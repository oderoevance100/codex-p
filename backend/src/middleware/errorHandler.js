// Catches anything thrown or passed to next(err) in a route/controller so
// one bad request can't crash the server, and the client always gets JSON
// back instead of an HTML stack trace.
module.exports = function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
};
