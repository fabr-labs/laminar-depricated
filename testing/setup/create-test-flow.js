
import { createUserFlow } from "../../src/user-flow/create-user-flow.js";
import { testingMiddleware } from "../middleware/testing-middleware.js";

export const steps = testingMiddleware();
const middleware = [steps.middleware];

export const flow = createUserFlow({ middleware });