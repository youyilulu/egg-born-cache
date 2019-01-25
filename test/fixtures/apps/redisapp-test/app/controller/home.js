'use strict';

const redis = require('redis');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.app.cache.use('redis', redis.createClient({
      host: '127.0.0.1',
      port: 6379,
    }));
  }
  async index() {
    await this.app.cache.set('name', 'redis');
    this.ctx.body = 'hi, ' + await this.app.cache.get('name');
  }
}

module.exports = HomeController;
