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

    assert(client.host && client.port,
      `[egg-born] 'host: ${client.host}', 'port: ${client.port}' are required on config.redis`);
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
        port: 6379,
      },
    },
    keys: 'cache_20190124',
  };
};

```

### add strategy to cache context
```js
// app.js or application.js
app.cache.use('redis', new RedisStrategy(app.config.redis));

```

# Road Map

- [x] CacheStrategy封装到egg-born-core中，这样可以约定cache strategy的接口，避免混淆
- [x] 依赖egg-born-core
- [ ] promisify改为主动方式（因为发现同步方法通过promisify后，直接pending了）

# TODO
- [x] 在app中测试该插件的使用情况