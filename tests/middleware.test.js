const Memcached = require('memcached-promise');
const cache = require('../server/middleware/memcached/index');

describe('Memcached Tests', () => {
  describe('Write Action', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should returned the retrieved item from memcached if defined', async () => {
      Memcached.prototype.get = jest
        .fn()
        .mockResolvedValue([{ productID: '1' }]);

      const response = await cache.retrieve('TEST');
      expect(response[0].productID).toEqual('1');
    });

    it('should return undefined if no data is found', async () => {
      Memcached.prototype.get = jest.fn().mockResolvedValue(undefined);

      const response = await cache.retrieve('TEST');
      expect(response).toBeUndefined();
    });

    it('should throw an error if an error occurs within memcached', async () => {
      const fakeError = new Error('TEST ERROR');
      jest.mock('memcached-promise');
      Memcached.prototype.get = jest.fn().mockRejectedValue(fakeError);

      try {
        await cache.retrieve('TEST');
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
    it('should store an item into memcached', async () => {
      jest.mock('memcached-promise');
      Memcached.prototype.set = jest.fn().mockResolvedValue(true);

      const response = await cache.store('TEST', [{ productID: 'TEST' }], 1);
      expect(response).toEqual(true);
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
