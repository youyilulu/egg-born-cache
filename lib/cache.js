'use strict';

const CACHE_STRATEGY_REDIS = Symbol.for('EggBorn#CacheStrategy#redis');

const RedisCacheStrategy = require('./strategy/redis');

function createOneClient(config, app) {
  app.coreLogger.info('[egg-born-cache] use [%s]', config.cacheStrategy);
  switch (config.cacheStrategy) {
    case CACHE_STRATEGY_REDIS:
      return new RedisCacheStrategy(config.redis);
    default:
      throw new Error(`${config.cacheStrategy} not defined`);
  }
}

module.exports = app => {
  app.cache = createOneClient(app.config, app);
};
