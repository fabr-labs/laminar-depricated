export function createPromiseCache() {
  const PromisesCache = new Map();

  function getPromiseCacheObject(id) {
    return PromisesCache.get(id);
  }

  function deletePromiseCacheObject(id) {
    return PromisesCache.delete(id);
  }

  function hasPromise(id) {
    return PromisesCache.has(id);
  }
   
  function getPromise(id) {
    return getPromiseCacheObject(id).promise;
  }
    
  function resolvePromise(id, response) {
    return getPromiseCacheObject(id).resolve(response);
  }

  function removePromise(id) {
    return deletePromiseCacheObject(id);
  }

  function createPromise(id) {
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
