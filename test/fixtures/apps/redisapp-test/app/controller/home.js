'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.app.cache.set('name', 'redis');
    this.ctx.body = 'hi, ' + await this.app.cache.get('name');
  }
}

module.exports = HomeController;
