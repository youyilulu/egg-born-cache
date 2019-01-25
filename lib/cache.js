'use strict';

const CacheStrategy = require('./cache-strategy');

function createOneClient(config) {
  console.log('[egg-born-cache]createOneClient');
  const client = new CacheStrategy(config.redis);
  return client;
}

module.exports = app => {
  console.log('[egg-born-cache]cache');
  app.cache = createOneClient(app.config);
};
