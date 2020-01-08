import { createFlow } from '../src/lamnr.create.js';
import { waitMiddleware } from '../src/middleware/wait/wait.middleware.js';
import { reduceMiddleware } from '../src/middleware/reduce/reduce.middleware.js';
import { pushFlowMiddleware } from '../src/middleware/push-flow/push-flow.middleware.js';

const waitMiddlewareInstance = waitMiddleware();

export const flowController = createFlow({ middleware: [waitMiddlewareInstance, pushFlowMiddleware, reduceMiddleware] });