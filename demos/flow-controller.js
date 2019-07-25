import { createFlow } from '../src/create-flow.js';
import { waitMiddleware } from '../src/middleware/wait/wait-middleware.js';
import { reduceMiddleware } from '../src/middleware/reduce/reduce-middleware.js';

const waitMiddlewareInstance = waitMiddleware();

export const flowController = createFlow({ middleware: [waitMiddlewareInstance, reduceMiddleware] });