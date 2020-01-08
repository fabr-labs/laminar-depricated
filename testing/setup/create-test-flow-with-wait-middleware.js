
import { createFlow } from "../../src/laminar.create.js";
import { flowEventsMiddleware } from "../../src/middleware/flow-events/flow-events.middleware.js";
import { waitMiddleware } from "../../src/middleware/wait/wait.middleware.js";

export const flowEvents = flowEventsMiddleware(); 

const waitMiddlewareInstance = waitMiddleware();
const middleware = [waitMiddlewareInstance, flowEvents.middleware];

export const flow = createFlow({ middleware });
export const { wait, resolveWait, removeWait } = waitMiddlewareInstance;