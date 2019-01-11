import { createPromiseCache } from './promise-cache.js';

export function createWait() {

  let cache = createPromiseCache();

  /**
  * @param   {String}  on - The key for referencing the generated promise in promise-cache.
  * @param   {Boolean} async - An async wait returns an existing promise if already defined (by the resolver).
  * @returns {Promise}
  * @description Wait is an action creator that returns a new promise that can be used to hold a flow until resolved.
  */

  function wait({ on, async }) {
    return (async && cache.hasPromise(on)) ? cache.getPromise(on) : cache.createPromise(on);
  }

  /**
  * @param   {String}  on - The key referencing the promise to resolve in promise-cache.
  * @param   {Boolean} async - Resolving async waits before they are created, creates the wait.
  */

  function resolveWait({ on, async, response }) {
    if (async && !cache.hasPromise(on)) { cache.createPromise(on); }
    return cache.resolvePromise(on, response);
  }

  /**
  * @param   {String}  on - The key referencing the promise to resolve in promise-cache.
  * @param   {Boolean} async - Resolving async waits before they are created, creates the wait.
  *
  *          This method is for clearing old async waits.
  */

  function removeWait({ on }) {
    if (cache.hasPromise(on)) { cache.removePromise(on); }
  }

  return {
    wait,
    resolveWait,
    removeWait
  };
}