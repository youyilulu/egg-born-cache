'use strict';

const cache = require('./lib/cache');

const DefaultStrategy = require('./lib/default_strategy');

module.exports = app => {
  cache(app);
  app.cache.use('default', new DefaultStrategy());
};
