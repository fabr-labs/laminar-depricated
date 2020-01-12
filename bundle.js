'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function applyMiddleware(fn, middlewares) {
  return middlewares.reduce((fn, middleware) => middleware(fn), fn);
}

function gotoStep(id, flow) {
  return id ? flow.slice(flow.findIndex(step => step.id === id)) : flow;
}

const config = {
  unhandledError: null
};

function onError({ directive, meta, error, tries = 1, resolved = false }) {
  if (directive.onError && tries && !resolved) {
    return applyMiddleware(callFn, directive.onError)({ directive, meta, error, tries: tries -1, resolved });
  } else {
    if (config.unhandledError) config.unhandledError({ directive, meta, error, tries, resolved });
    throw(error);
  }
}

class LamnrError extends Error {
  constructor(message, { directive, meta, ...rest }) {
    super(message);
    this.name = `LAMNR => ${ meta.flow.name } in Row: ${ meta.index } line ${ directive.id } `;
    console.warn({ meta, directive, ...rest }); 
  }
}

async function callFn({ directive, meta, tries, resolved }) {
  const { call: fn = () => { throw new LamnrError('Missing call fn', { directive, meta, tries, resolved })}, args } = directive;

  try {
    return await fn.call(null, args);
  } catch (error) {
    return onError({ directive, meta, tries, resolved, error });
  }
}

function* flowGeneratorFn({ flow, middleware, args, goto }) {
  for (const [index, directive] of gotoStep(goto, flow(args)).entries()) {
    yield meta => applyMiddleware(callFn, middleware)({ directive, meta: { ...meta, flow, index } });
  }
}

class Required extends Error {}

function createFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow = () => { throw new Required(`flow`) }, args = {}, goto, meta }) {
      for (const directive of flowGeneratorFn({ flow, goto, args, middleware })) {
        await directive({ ...meta, pushFlow });
      }
    }
  }
}

const consoleLogMiddleware = logAll => next => ({ directive, meta }) => {

  if (directive.log || logAll) {
    console.group(`%c${directive.id}!`, `color: green; font-size:11px; font-weight: bold;`);
    console.log(directive);
  }

  const result = next({ directive, meta });

  if (directive.log || logAll) {
    console.log(result);
    console.groupEnd();
  }
  
  return result;
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

const flowEventsMiddleware = () => {

  const promises  = new Map();
  const responses = new Map();

  function applyResponse(id, responses, promises, response) {
    responses.has(id) ? responses.get(id).push(response) : responses.set(id, [{
      result: response
    }]);
    promises.has(id) && promises.get(id)[responses.get(id).length -1] && promises.get(id)[responses.get(id).length -1](response);
  }

  function on({ id, count=0 }) {
    return new Promise(resolve => {
      responses.has(id) && responses.get(id)[count] ? resolve(responses.get(id)[count].result) :
      promises.has(id) ? promises.get(id)[count] = resolve : 
      promises.set(id, { [count]: resolve });
    });
  }

  function resolved({ id, count=0 }) {
    return !!(responses.has(id) && responses.get(id)[count]);
  }

  function unresolved({ id, count=0 }) {
    return !(responses.has(id) && responses.get(id)[count]);
  }

  function cleanup() {
    promises.clear();
    responses.clear();
  }

  const middleware = next => ({ directive, meta }) => {
    const id = directive.id;
    const result = next({ directive, meta });

    if (result && result.then) {
      result.then(response => {
        applyResponse(id, responses, promises, response);
      }); 
    } else {
      applyResponse(id, responses, promises, result);
    }

    return result;
  };
  
  return {
    middleware,
    on,
    resolved,
    unresolved,
    cleanup,
  };
};

const httpErrorHandlerMiddleware = (globalErrorHandlers) => next => ({ directive, meta }) => {
 
  if (directive.get || directive.put || directive.post || directive.delete) {
    const result = next({ directive: { ...directive, onError: [...globalErrorHandlers, ...(directive.onError || [])] }, meta });
    return result;
  }

  const result = next({ directive, meta });
  return result;
};

/* eslint-disable prettier/prettier */
const optionsMiddleware = next => ({ directive, meta }) => {
  const response = next({ directive, meta });

  if (directive.options) {
    return response.then(result => {
      return meta.pushFlow({ flow: () => directive.options[result ? 'continue' : 'cancel'], args: directive.args });
    })
  }

  return response;
};

function flowStep(step) {
  return () => [
    step
  ]
}

const promiseAllMiddleware = next => ({ directive, meta }) => {

  if (directive.all) {
    return next({ directive: { ...directive, call: () => Promise.all(directive.all.map(directive => meta.pushFlow({ flow: flowStep(directive) }))) }, meta });
  }

  return next({ directive, meta })
};

/* eslint-disable prettier/prettier */
const pushFlowMiddleware = next => ({ directive, meta }) => {
  if (directive.pushFlow) {
    if (directive.pushFlow.flow) {
      // Manage plain object passed as push flow argument.
      return next({ directive: { ...directive, call: meta.pushFlow, args: directive.pushFlow }, meta });
    }
    // Manage functions passed as pushFlow argument.
    return next({ directive: { ...directive, call: (args) => meta.pushFlow({ ...directive.pushFlow(args), args: directive.args }), ...directive  }, meta });
  }
  return next({ directive, meta })
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

const saveResponseMiddleware = () => {

  const responseStore = new Map();

  const middleware = next => ({ directive, meta }) => {

    if (directive.returnResponse) {
      return next({ directive: directive.returnResponse ? { ...directive, args: { [directive.returnResponse]: responseStore.get(directive.returnResponse), ...(directive.args || {}) } } : directive, meta });
    }

    if (directive.useResponse) {
      const { useResponse, ...rest } = directive;
      return next({ directive: { ...rest, ...(useResponse(responseStore))}, meta });
    }

    const result = next({ directive, meta });
  
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

function createPromiseCache() {
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
      directive.wait ?  { ...directive, call: promiseStore.wait, args: { ...(directive.args || {}), ...directive.wait  }} : 
      directive.resolveWait ? { ...directive, call: promiseStore.resolveWait, args: { ...(directive.args || {}), ...directive.resolveWait  }} : 
      directive.removeWait ? { ...directive, call: promiseStore.removeWait, args: { ...(directive.args || {}), ...directive.removeWait }} : 
      directive;

      const result = next({ directive: nextDirective, meta });
    return result;
  };

  middleware.wait = promiseStore.wait;
  middleware.resolveWait = promiseStore.resolveWait;
  middleware.removeWait = promiseStore.removeWait;

  return middleware;
};

exports.consoleLogMiddleware = consoleLogMiddleware;
exports.createFlow = createFlow;
exports.fetchMiddleware = fetchMiddleware;
exports.flowEventsMiddleware = flowEventsMiddleware;
exports.httpErrorHandlerMiddleware = httpErrorHandlerMiddleware;
exports.optionsMiddleware = optionsMiddleware;
exports.promiseAllMiddleware = promiseAllMiddleware;
exports.pushFlowMiddleware = pushFlowMiddleware;
exports.reduceMiddleware = reduceMiddleware;
exports.reduxStoreMiddleware = reduxStoreMiddleware;
exports.saveResponseMiddleware = saveResponseMiddleware;
exports.validateResponseMiddleware = validateResponseMiddleware;
exports.waitMiddleware = waitMiddleware;
