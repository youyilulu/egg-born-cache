'use strict';

const CacheContext = require('./cache-context');
const cacheContext = new CacheContext();
module.exports = app => {
  app.cache = cacheContext;
};
