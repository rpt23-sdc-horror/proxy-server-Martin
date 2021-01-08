const Memcached = require('memcached');

require('dotenv').config();

class MemoryCache {
  constructor() {
    const host = process.env.CACHE_HOST || 'localhost';

    this.cache = new Memcached(`${host}:11211`);
  }

  retrieve = async (key) => {
    const cache = this.cache;

    return new Promise((resolve, reject) => {
      cache.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  store = async (key, value, lifetime) => {
    const cache = this.cache;

    return new Promise((resolve, reject) => {
      cache.set(key, value, lifetime * 60, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  };
}

module.exports = MemoryCache;
