
import { createFlow } from "../../src/laminar.create.js";
import { testingMiddleware } from "../middleware/testing-middleware.js";
import { waitMiddleware } from "../../src/middleware/wait/wait-middleware.js";
import { testReducer } from "../reducers/test-reducer.js";
import { createStore } from "../../node_modules/redux/dist/redux.js";

export const steps = testingMiddleware(); 

const waitMiddlewareInstance = waitMiddleware();
const middleware = [waitMiddlewareInstance, steps.middleware];

export const flow = createFlow({ middleware });
export const { wait, resolveWait, removeWait } = waitMiddlewareInstance;