'use strict';

const CACHE_STRATEGY_REDIS = Symbol.for('EggBorn#CacheStrategy#redis');

module.exports = () => {
  const config = {
    cacheStrategy: CACHE_STRATEGY_REDIS,
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: null,
    },
    keys: 'cache_20190124',
  };
  return config;
};
