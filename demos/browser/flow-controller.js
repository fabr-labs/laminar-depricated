import { createFlow } from '../../src/createFlow.js';
import { waitMiddleware } from '../../src/middleware/wait/wait.middleware.js';
import { reduceMiddleware } from '../../src/middleware/reduce/reduce.middleware.js';
import { statsMiddleware } from '../../src/middleware/stats/stats.middleware.js';

const waitMiddlewareInstance = waitMiddleware();

export function otherTestMiddleware() {
  return function(next) {
    return (step) => {
      return next(step)
    }
  }
}

export function testMiddleware(next) {
  return (step) => {
    return next(step)
  }
}

export const flowController = createFlow({
  middleware: [
    testMiddleware,
    otherTestMiddleware(null),  
    // statsMiddleware({ log: true }),
    // waitMiddlewareInstance,
    // pushFlowMiddleware,
    // reduceMiddleware
  ],
});
