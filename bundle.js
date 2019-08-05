(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.laminar = {})));
}(this, (function (exports) { 'use strict';

function applyMiddleware(fn, middlewares) {
  return middlewares.reduce((fn, middleware) => middleware(fn), fn);
}

function gotoStep(id, flow) {
  return id ? flow.slice(flow.findIndex(step => step.id === id)) : flow;
}

function onError({ directive, meta, error }) {
  if (directive.onError) {
    directive.onError.forEach(handler => {
      handler({ directive, meta, error });
    });
  } else {
    console.warn('Unhandled ERROR !!! ', error);
  }
}

class LaminarError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class flowGeneratorFnError extends LaminarError {
  constructor(message, { id, step }) {
    super();
    this.message = message;
    this.flow = id;
    this.step = step;
  }
}

class MissingCallerError extends flowGeneratorFnError {
  constructor({ flowName, step }) {
    console.error(`MissingCallerError - flow: ${ flowName }, step: ${ step + 1 } (index: ${ step })`);
    super(`A step must contain either a "call" property referencing a single function to be called, or a "calls" property referencing an array of functions to be called asynchronously.`, { flow: flowName, step });
  }
}

class MissingFlowError extends flowGeneratorFnError {
  constructor(message) {
    super(message);
  }
}

// Default property guards.

function throwMissingFlowError() {
  throw new MissingFlowError('Missing flow from flow.pushFlow({ flow: Function })');
}

function throwMissingCallerError({ flow, step }) {
  throw new MissingCallerError({ flowName: flow.name, step });
}

function callFn({ directive, meta }) {

  const { call: fn = throwMissingCallerError(meta), args } = directive;

  try {

    const result = fn.call(null, args);

    if (result && result.catch) {
      result.catch(error => {
        onError({ directive, meta, error });
        meta.generator.return();
      });
    }

    return result;

  } catch (error) {
    onError({ directive, meta, error });
    throw new Error(error);
  }
}

function* flowGeneratorFn({ flow, middleware, args, goto }){
  for (let [index, directive] of gotoStep(goto, flow(args)).entries()) {    
    try {
      if (directive.calls) {
        yield meta => Promise.all(directive.calls.map(asyncDirective => applyMiddleware(callFn, middleware)({ directive: asyncDirective, meta: { ...meta, step: index }})));
      } else {
        yield meta => applyMiddleware(callFn, middleware)({ directive, meta: { ...meta, step: index }});
      }
    } catch (error) {
      console.warn(error);
      return;
    }
  }
}

function createFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError(), args = {}, goto, meta = { retries: new Map([['history', []]]) }}) {
      const generator = flowGeneratorFn({ flow, goto, args, middleware });
      for (const directive of generator) {
        await directive({ ...meta, pushFlow, generator, flow });
      }
    }
  }
}

const reduxStoreMiddleware = store => next => ({ directive, meta }) => {

  // Handle direct dispatch.
  const result = next({ directive: directive.dispatch ? { call: () => store.dispatch(directive.dispatch), ...directive } : directive, meta });

  // Save response to store.
  if (directive.store) {
    if (result.then) {
      result.then(response => {
        store.dispatch({ type: directive.store, [directive.as || 'data']: response });
      });
    } else {
      store.dispatch({ type: directive.store, [directive.as || 'data']: result });
    }
  }

  return result;

};

const reduceMiddleware = next => ({ directive, meta }) => {

  const result = next({ directive, meta });

  if (directive.reduce) {
    if (result.then) {
      return result.then(response => {
        return directive.reduce(response);
      });
    } else {
      return directive.reduce(result);
    }
  }
  return result;
};

class MissingPromise       extends Error {}
class MissingRequiredParam extends Error {}

function required(param) {
  throw new MissingRequiredParam(param);
}

function createPromiseCache() {
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

function createWait() {

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

const waitMiddleware = () => {

  const promiseStore = createWait();

  const middleware = next => ({ directive, meta }) => {
    
    const nextDirective = 
      directive.wait ?  { call: promiseStore.wait, args: { ...(directive.args || {}), ...directive.wait  }, ...directive } : 
      directive.resolveWait ? { call: promiseStore.resolveWait, args: { ...(directive.args || {}), ...directive.resolveWait  }, ...directive } : 
      directive.removeWait ? { call: promiseStore.removeWait, args: { ...(directive.args || {}), ...directive.removeWait }, ...directive } : 
      directive;

      const result = next({ directive: nextDirective, meta });
    return result;
  };

  middleware.wait = promiseStore.wait;
  middleware.resolveWait = promiseStore.resolveWait;
  middleware.removeWait = promiseStore.removeWait;

  return middleware;
};

const pushFlowMiddleware = next => ({ directive, meta }) => {
  if (directive.pushFlow) {
    if (directive.pushFlow.flow) {
       // Manage plain object passed as push flow argument.
      return next({ directive: { call: meta.pushFlow, args: { ...directive.pushFlow, args: directive.args }, ...directive }, meta });
    } else {
      // Manage functions passed as pushFlow argument.
      return next({ directive: { call: (args) => { meta.pushFlow({ ...directive.pushFlow(args), args: directive.args }); }, ...directive  }, meta });
    }
  }
  return next({ directive, meta })
};

const saveResponseMiddleware = () => {

  const responseStore = new Map();

  const middleware = next => ({ directive, meta }) => {

    const result = next({ directive: directive.useResponse ? { ...directive, args: { [directive.useResponse]: responseStore.get(directive.useResponse), ...(directive.args || {}) } } : directive, meta });
  
    if (directive.saveResponse) {
      if (result.then) {
        result.then(response => {
          responseStore.set(directive.saveResponse, response);
        });
      } else {
        responseStore.set(directive.saveResponse, result);
      }
    }
  
    return result;
  
  };

  middleware.responses = responseStore;
  return middleware;
};

const fetchMiddleware = ({ get, put, post, delete: del }) => next => ({ directive, meta }) => {

  if (directive.get) {
    return next({ directive: { call: get, args: directive.get, ...directive }, meta });
  }

  if (directive.put) {
    return next({ directive: { call: put, args: directive.put, ...directive }, meta });
  }

  if (directive.post) {
    return next({ directive: { call: post, args: directive.post, ...directive }, meta });
  }

  if (directive.delete) {
    return next({ directive: { call: del, args: directive.delete, ...directive }, meta });
  }

  return  next({ directive, meta });
};

const validateResponseMiddleware = validator => next => ({ directive, meta }) => {

  const result = next({ directive, meta });

  if (directive.validate) {
    if (result.then) {
      result.then(response => {
        validate(response);
      });
    } else {
      validate(result);
    }
  }

  return result;

};

exports.createFlow = createFlow;
exports.reduxStoreMiddleware = reduxStoreMiddleware;
exports.reduceMiddleware = reduceMiddleware;
exports.waitMiddleware = waitMiddleware;
exports.pushFlowMiddleware = pushFlowMiddleware;
exports.saveResponseMiddleware = saveResponseMiddleware;
exports.fetchMiddleware = fetchMiddleware;
exports.validateResponseMiddleware = validateResponseMiddleware;

Object.defineProperty(exports, '__esModule', { value: true });

})));
