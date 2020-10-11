import { laminar } from '../../src/createFlow.js';
import { waitMiddleware } from '../../src/middleware/wait/wait.middleware.js';
import { reduceMiddleware } from '../../src/middleware/reduce/reduce.middleware.js';
import { pushFlowMiddleware } from '../../src/middleware/push-flow/push-flow.middleware.js';
import { statsMiddleware } from '../../src/middleware/stats/stats.middleware.js';

const waitMiddlewareInstance = waitMiddleware();

/* eslint-disable prettier/prettier */
// export const testMiddleware = next => (step) => {
//   console.log('testMiddleware', this);
//   console.log(step);
//   return next(step)
// };

export function otherTestMiddleware(stuff) {
  return function(next) {
    return (step) => {
      return next(step)
    }
  }
};

export function testMiddleware(next) {
  return (step) => {
    return next(step)
  }
};

export const flowController = laminar.createFlow({
  middleware: [
    testMiddleware,
    otherTestMiddleware(null),  
    // statsMiddleware({ log: true }),
    // waitMiddlewareInstance,
    // pushFlowMiddleware,
    // reduceMiddleware
  ],
});
