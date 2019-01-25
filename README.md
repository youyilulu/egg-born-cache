# egg-born-cache

## Usage
### 实现CacheStrategy
```js
// redis-strategy.js

'use strict';
const assert = require('assert');
const redis = require('redis');

const CacheStrategy = require('../cache-strategy');

class RedisCacheStrategy extends CacheStrategy {
  constructor(options) {
    const client = options.client;
    const clients = options.clients;
    assert(!client || !clients, '[egg-born-cache] client configuration missing, require either client or clients');

    assert(client.host && client.port,
      `[egg-born-cache] 'host: ${client.host}', 'port: ${client.port}' are required on config.redis`);
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

- [ ] CacheStrategy封装到egg-born-core中，这样可以约定cache strategy的接口，避免混淆
- [ ] 依赖egg-born-core

# TODO
- [ ] 在app中测试该插件的使用情况