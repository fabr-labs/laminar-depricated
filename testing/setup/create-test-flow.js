
import { createFlow } from "../../src/lamnr.create.js";
import { flowEventsMiddleware } from "../../src/middleware/flow-events/flow-events.middleware.js";
import { pushFlowMiddleware } from "../../src/middleware/push-flow/push-flow.middleware.js";
import { saveResponseMiddleware } from "../../src/middleware/save-response/save-response.middleware.js";

export const flowEvents = flowEventsMiddleware();
const middleware = [pushFlowMiddleware, saveResponseMiddleware(), flowEvents.middleware];

export const flow = createFlow({ middleware });