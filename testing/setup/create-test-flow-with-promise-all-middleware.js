
import { createFlow } from "../../src/laminar.create.js";
import { testingMiddleware } from "../middleware/testing-middleware.js";
import { promiseAllMiddleware } from "../../src/middleware/promise-all/promise-all.middleware.js";

export const steps = testingMiddleware(); 

const middleware = [promiseAllMiddleware, steps.middleware];

export const flow = createFlow({ middleware });
