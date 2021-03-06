# egg-born-cache

## Usage

### local usage - link

clone egg-born-core[https://github.com/youyilulu/egg-born-core] first

```bash
cd egg-born-core && npm link
cd ../egg-born-cache && npm link egg-born-core
```

### implement CacheStrategy

```js
// need link or install egg-born-core
'use strict';
const assert = require('assert');
const redis = require('redis');

const { CacheStrategy } = require('egg-born-core');

class RedisCacheStrategy extends CacheStrategy {
  constructor(options) {
    const client = options.client;
    const clients = options.clients;
    assert(!client || !clients, '[egg-born] client configuration missing, require either client or clients');

    assert(
      client.host && client.port,
      `[egg-born] 'host: ${client.host}', 'port: ${client.port}' are required on config.redis`
    );
    super(redis.createClient(client));
  }
}

module.exports = RedisCacheStrategy;
```

### config

```js
// config.default.js

'use strict';

module.exports = () => {
  return {
    redis: {
      client: {
        host: '127.0.0.1',
        port: 6379
      }
    },
    keys: 'cache_20190124'
  };
};
```

### add strategy to cache context

```js
// app.js or application.js
app.cache.use('redis', new RedisCacheStrategy(app.config.redis));
```

### methods

cache_context 包含三个方法，get、set 以及 del，参数跟随 strategy

# Road Map

- [x] CacheStrategy 封装到 egg-born-core 中，这样可以约定 cache strategy 的接口，避免混淆
- [x] 依赖 egg-born-core
- [x] promisify 改为主动方式（因为发现同步方法通过 promisify 后，直接 pending 了）
- [x] 可手动指定默认 cacheStrategy

# TODO

- [x] 在 app 中测试该插件的使用情况
