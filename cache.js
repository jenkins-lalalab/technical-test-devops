const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {
  retry_strategy(options) {
    if (options.attempt > 20) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
});

const cache = {
  set: promisify(client.set).bind(client),
  get: promisify(client.get).bind(client),
  keys: promisify(client.keys).bind(client),
  del: promisify(client.del).bind(client),
};

module.exports = cache;
