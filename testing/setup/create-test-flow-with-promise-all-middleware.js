
import { createFlow } from "../../src/createFlow.js";
import { flowEventsMiddleware } from "../../src/middleware/flow-events/flow-events.middleware.js";
import { promiseAllMiddleware } from "../../src/middleware/promise-all/promise-all.middleware.js";

export const flowEvents = flowEventsMiddleware(); 

const middleware = [promiseAllMiddleware, flowEvents.middleware];

export const flow = createFlow({ middleware });
