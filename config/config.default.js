'use strict';

const CACHE_STRATEGY_REDIS = Symbol.for('EggBorn#CacheStrategy#redis');

module.exports = () => {
  const config = Object.create(null);
  config.cacheStrategy = CACHE_STRATEGY_REDIS;
  config.redis = {
    host: '127.0.0.1',
    port: 6379,
  };
  return config;
};
