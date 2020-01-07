
import { createFlow } from "../../src/laminar.create.js";
import { flowEventsMiddleware } from "../../src/middleware/flow-events/flow-events.middleware.js";
import { reduceMiddleware } from "../../src/middleware/reduce/reduce.middleware.js";
import { reduxStoreMiddleware } from "../../src/middleware/redux-store/redux-store.middleware.js";
import { testReducer } from "../reducers/test-reducer.js";
import { createStore } from "../../node_modules/redux/dist/redux.js";

export const store = createStore(testReducer);

export const flowEvents = flowEventsMiddleware();
const middleware = [reduceMiddleware, reduxStoreMiddleware(store), flowEvents.middleware];

export const flow = createFlow({ middleware });