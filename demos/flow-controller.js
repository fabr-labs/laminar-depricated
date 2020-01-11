import { createFlow } from '../src/lamnr.create.js';
import { waitMiddleware } from '../src/middleware/wait/wait.middleware.js';
import { reduceMiddleware } from '../src/middleware/reduce/reduce.middleware.js';
import { pushFlowMiddleware } from '../src/middleware/push-flow/push-flow.middleware.js';
import { statsMiddleware } from '../src/middleware/stats/stats.middleware.js';

const waitMiddlewareInstance = waitMiddleware();

export const flowController = createFlow({ middleware: [statsMiddleware({ log: true }), waitMiddlewareInstance, pushFlowMiddleware, reduceMiddleware] });