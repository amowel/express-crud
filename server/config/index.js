const config = require(`./${(process.env.NODE_ENV || 'development')}.js`);
module.exports = {
  mongooseUri: config.mongooseUri,
  secret: config.secret,
  port: config.port
};
