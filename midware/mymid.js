const db = require('../data/db.js');

module.exports = {
  logger,
  jwtSecret: process.env.JWT_SECRET || 'is it secret, is it safe?',

}

function logger(request, responce, next) {
  const { method, originalUrl } = request;
  console.log(`${method} to ${originalUrl} at ${Date(Date.now())}`);

  next();
}
