import { createFlow } from '../../src/createFlow.js';
import { waitMiddleware } from '../../src/middleware/wait/wait.middleware.js';
import { reduceMiddleware } from '../../src/middleware/reduce/reduce.middleware.js';
import { statsMiddleware } from '../../src/middleware/stats/stats.middleware.js';

const waitMiddlewareInstance = waitMiddleware();

export function otherTestMiddleware() {
  return (next) => {
    return (directive) => {
      return next(directive)
    }
  }
}

export function testMiddleware(next) {
  return (directive) => {
    return next(directive)
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
