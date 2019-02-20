'use strict';

const cache = require('./lib/cache');

const DefaultStrategy = require('./lib/default_strategy');

module.exports = app => {
  cache(app);
  if (!app.cache.clients.has('default')) {
    app.cache.use('default', new DefaultStrategy());
  }
};
