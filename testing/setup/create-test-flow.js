
import { createFlow } from "../../src/createFlow.js";
import { flowEventsMiddleware } from "../../src/middleware/flow-events/flow-events.middleware.js";
import { saveResponseMiddleware } from "../../src/middleware/save-response/save-response.middleware.js";

export const flowEvents = flowEventsMiddleware();
const middleware = [flowEvents.middleware, saveResponseMiddleware()];

export const flow = createFlow({ middleware });