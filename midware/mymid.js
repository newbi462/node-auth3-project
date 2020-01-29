const db = require('../data/db.js');

module.exports = {
  logger,
}

function logger(request, responce, next) {
  const { method, originalUrl } = request;
  console.log(`${method} to ${originalUrl} at ${Date(Date.now())}`);

  next();
}
