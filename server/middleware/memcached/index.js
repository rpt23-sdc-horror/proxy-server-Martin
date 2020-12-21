'use strict';

const Memcached = require('memcached-promise');

const memcached = new Memcached('127.0.0.1:11211');

const retrieve = async (key) => {
  try {
    const response = await memcached.get(key);
    return response ? response : undefined;
  } catch (err) {
    console.error('Memcached ', err);
    throw err;
  }
};

const store = async (key, body, duration) => {
  try {
    await memcached.set(key, body, duration * 360);
    return true;
  } catch (err) {
    console.error('Memcached ', err);
    throw err;
  }
};

module.exports = { retrieve, store };
