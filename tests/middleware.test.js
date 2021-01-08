const Memcached = require('memcached');
const MemoryCache = require('../server/middleware/memcached/index');

describe('Memcached Tests', () => {
  const cache = new MemoryCache();

  describe('Write Action', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should returned the retrieved item from memcached if defined', async () => {
      jest.mock('memcached');

      Memcached.prototype.get = jest
        .fn()
        .mockResolvedValue([{ productID: '1' }]);

      const response = await cache.retrieve('TEST');

      expect(response[0].productID).toEqual('1');
    });

    it('should return undefined if no data is found', async (done) => {
      Memcached.prototype.get = jest.fn().mockResolvedValue(undefined);

      const response = await cache.retrieve('TEST');

      expect(response).toBeUndefined();

      await done();
    });

    it('should throw an error if an error occurs within memcached', async (done) => {
      const fakeError = new Error('TEST ERROR');

      jest.mock('memcached');

      Memcached.prototype.get = jest.fn().mockRejectedValue(fakeError);

      try {
        await cache.get('TEST');
      } catch (err) {
        console.log(err);
        expect(err).toEqual(fakeError);
      }
    });
  });

  describe('Store Action', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should store an item into memcached', async (done) => {
      jest.mock('memcached');

      Memcached.prototype.set = jest.fn().mockResolvedValue(true);

      const response = await cache.store('TEST', [{ productID: 'TEST' }], 1);
      expect(response).toEqual(true);

      done();
    });

    it('should throw an error if an error occurs within memcached', async () => {
      const fakeError = new Error('TEST ERROR');

      jest.mock('memcached-promise');

      Memcached.prototype.set = jest.fn().mockRejectedValue(fakeError);

      try {
        await cache.store('TEST');
      } catch (err) {
        console.log(err);
        expect(err).toEqual(fakeError);
      }
    });
  });
});
