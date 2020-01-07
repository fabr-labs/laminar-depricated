import { required, MissingPromise } from "./custom-errors.js";

export function createPromiseCache() {
  const PromisesCache = new Map();

  function getPromiseCacheObject(id) {
    return PromisesCache.get(id);
  }

  function deletePromiseCacheObject(id) {
    return PromisesCache.delete(id);
  }

  function hasPromise(id = required("id")) {
    return PromisesCache.has(id);
  }
   
  function getPromise(id = required("id")) {
    return getPromiseCacheObject(id).promise;
  }
    
  function resolvePromise(id = required("id"), response) {
    return getPromiseCacheObject(id).resolve(response);
  }

  function removePromise(id = required("id")) {
    return deletePromiseCacheObject(id);
  }

  function createPromise(id = required("id")) {
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
