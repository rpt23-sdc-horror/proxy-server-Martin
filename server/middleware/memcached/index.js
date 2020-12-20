'use strict';

const Memcached = require('memcached');

const memcached = new Memcached('127.0.0.1:11211');

const retrieve = async function (key) {
  memcached.get(key, function (err, data) {
    if (err) {
      console.error(err);
      throw err;
    }

    if (data) {
      return data;
    } else {
      return null;
    }
  });
};

const store = async function (key, body, duration) {
  memcached.set(key, body, duration * 360, function (error) {
    if (error) {
      console.error(error);

      throw error;
    }
  });
};

module.exports = { retrieve, store };
