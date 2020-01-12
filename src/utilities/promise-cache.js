import { Required } from "./custom-errors.js";

export function createPromiseCache() {
  const PromisesCache = new Map();

  function getPromiseCacheObject(id) {
    return PromisesCache.get(id);
  }

  function deletePromiseCacheObject(id) {
    return PromisesCache.delete(id);
  }

  function hasPromise(id = () => { throw new Required("id") }) {
    return PromisesCache.has(id);
  }
   
  function getPromise(id = () => { throw new Required("id") }) {
    return getPromiseCacheObject(id).promise;
  }
    
  function resolvePromise(id = () => { throw new Required("id")}, response) {
    return getPromiseCacheObject(id).resolve(response);
  }

  function removePromise(id = () => { throw new Required("id") }) {
    return deletePromiseCacheObject(id);
  }

  function createPromise(id = () => { throw new Required("id") }) {
    let res, rej;
    let promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    PromisesCache.set(id, { resolve: res, reject: rej, promise });
    return promise;
  };

  return {
    hasPromise,
    getPromise,
    resolvePromise,
    createPromise,
    removePromise
  };
}
