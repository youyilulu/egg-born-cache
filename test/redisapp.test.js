'use strict';

const mock = require('egg-mock');

describe('test/hello.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/redisapp-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, default')
      .expect(200);
  });
});
