'use strict';

const { CacheStrategy } = require('egg-born-core');

const cacheClient = new Map();
class DefaultStrategy extends CacheStrategy {
  constructor() {
    super(cacheClient);
  }
}

module.exports = DefaultStrategy;
