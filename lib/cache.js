'use strict';

const CACHE_STRATEGY_REDIS = Symbol.for('EggBorn#CacheStrategy#redis');

const CacheStrategy = require('./cache-strategy');
const RedisCacheStrategy = require('./strategy/redis');

const use = (config, app) => {
  app.coreLogger.info('[egg-born-cache] use [%s]', config.cacheStrategy);
  return createOneClient(config);
};

function createOneClient(config) {
  switch (config.cacheStrategy) {
    case CACHE_STRATEGY_REDIS:
      return new RedisCacheStrategy(config.redis);
    default:
      throw new Error(`${config.cacheStrategy} not defined`);
  }
}

module.exports = app => {
  const cache = Object.create(null);
  cache.CacheStrategy = CacheStrategy;
  cache.default = use(app.config, app);

  app.cache = cache;
};
