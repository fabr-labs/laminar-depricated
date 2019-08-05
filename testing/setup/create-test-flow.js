
import { createFlow } from "../../src/laminar.create.js";
import { testingMiddleware } from "../middleware/testing-middleware.js";
import { pushFlowMiddleware } from "../../src/middleware/push-flow/push-flow-middleware.js";
import { saveResponseMiddleware } from "../../src/middleware/save-response/save-response-middleware.js";

export const steps = testingMiddleware();
const middleware = [saveResponseMiddleware(), pushFlowMiddleware, steps.middleware];

export const flow = createFlow({ middleware });