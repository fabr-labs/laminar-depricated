import { required, MissingPromise } from "./custom-errors.js";

export function createPromiseCache() {
  const PromisesCache = new Map();

  const hasPromise = (id = required("id")) =>
    PromisesCache.has(id);

  const getPromise = (id = required("id")) =>
    _getPromiseCacheObject(id).promise;

  const resolvePromise = (id = required("id"), response) =>
    _getPromiseCacheObject(id).resolve(response);

  const removePromise = (id = required("id")) =>
    _deletePromiseCacheObject(id);

  const createPromise = (id = required("id")) => {
    let res, rej;
    let promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    PromisesCache.set(id, { resolve: res, reject: rej, promise: promise });
    return promise;
  };

  function _getPromiseCacheObject(id) {
    try {
      return PromisesCache.get(id);
    } catch (error) {
      if (!PromisesCache.has(id)) {
        throw new MissingPromise(`!!! Promise id ${id} not found !!!`);
      }
      throw error;
    }
  }

  function _deletePromiseCacheObject(id) {
    try {
      if (PromisesCache.has(id)) {
        return PromisesCache.delete(id);
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  return {
    hasPromise,
    getPromise,
    resolvePromise,
    createPromise,
    removePromise
  };
}
