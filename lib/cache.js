'use strict';

const CacheContext = require('./cache_context');
const cacheContext = new CacheContext();
module.exports = app => {
  app.cache = cacheContext;
};
