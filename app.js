'use strict';

const cache = require('./lib/cache');

const RedisStrategy = require('./lib/strategy/redis');

module.exports = app => {
  cache(app);
  app.cache.use('redis', new RedisStrategy(app.config.redis));
};
