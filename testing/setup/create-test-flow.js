
import { createFlow } from "../../src/create-flow.js";
import { testingMiddleware } from "../middleware/testing-middleware.js";

export const steps = testingMiddleware();
const middleware = [steps.middleware];

export const flow = createFlow({ middleware });