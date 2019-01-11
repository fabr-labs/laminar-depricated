export const testingMiddleware = () => {

  const promises = new Map();
  const responses = new Map();

  function applyResponse(id, responses, promises, response) {
    responses.has(id) ? responses.get(id).push(response) : responses.set(id, [{
      result: response
    }]);
    promises.has(id) && promises.get(id)[responses.get(id).length -1] && promises.get(id)[responses.get(id).length -1](response);
  }
  
  return {

    middleware: next => directive => {

      const id = directive.id;
      const result = next(directive);

      if (result && result.then) {
        result.then(response => {
          applyResponse(id, responses, promises, response);
        }); 
      } else {
        applyResponse(id, responses, promises, result);
      }

      return result;
    },
    cleanup() {
      promises.clear();
      responses.clear();
    },
    on({ id, count=0 }) {
      return new Promise(resolve => {
        responses.has(id) && responses.get(id)[count] ? resolve(responses.get(id)[count].result) :
        promises.has(id) ? promises.get(id)[count] = resolve : 
        promises.set(id, { [count]: resolve });
      });
    },
    resolved({ id, count=0 }) {
      return !!(responses.has(id) && responses.get(id)[count]);
    },
    unresolved({ id, count=0 }) {
      return !(responses.has(id) && responses.get(id)[count]);
    },
  };
};