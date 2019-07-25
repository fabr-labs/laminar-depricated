
import { createFlow } from "../../src/create-flow.js";
import { testingMiddleware } from "../middleware/testing-middleware.js";
import { pushFlowMiddleware } from "../../src/middleware/push-flow/push-flow-middleware.js"

export const steps = testingMiddleware();
const middleware = [pushFlowMiddleware, steps.middleware];

export const flow = createFlow({ middleware });