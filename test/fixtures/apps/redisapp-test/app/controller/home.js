'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log(this.app.cache);
    this.ctx.body = 'hi, ' + this.app.cache.default.get();
  }
}

module.exports = HomeController;
