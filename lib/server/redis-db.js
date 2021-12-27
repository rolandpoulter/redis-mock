'use strict';

const helpers = require('../helpers');

class RedisDb {

  constructor() {
    this.storage = {};
  }

  flushdb(callback) {
    this.storage = {};

    helpers.callCallback(callback, null, 'OK');
  }

  time(callback) {
    const now = Date.now();
    helpers.callCallback(callback, null, [
      Math.floor(now / 1000).toString(),
      ((now % 1000) * 1000).toString()
    ]);
  }
}

/**
 * Import all methods
 *
 * The server contains a log of logic. It only feels natural to split it into multiple files
 */
const importMethods = (lib) => (
  Object.assign(RedisDb.prototype, lib)
);

importMethods(require('./strings'));
importMethods(require('./keys'));
importMethods(require('./hash'));
importMethods(require('./set'));
importMethods(require('./list.js'));
importMethods(require('./sortedset'));
importMethods(require('./script'));

module.exports = RedisDb;
