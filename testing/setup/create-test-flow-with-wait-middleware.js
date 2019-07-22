
import { createFlow } from "../../src/create-flow.js";
import { testingMiddleware } from "../middleware/testing-middleware.js";
// import { promiseWaitMiddleware } from "../../src/middleware/promise-wait/promise-wait-middleware.js";
import { testReducer } from "../reducers/test-reducer.js";
import { createStore } from "../../node_modules/redux/dist/redux.js";

export const store = createStore(testReducer);
export const steps = testingMiddleware();

const middleware = [steps.middleware];

export const flow = createFlow({ middleware });