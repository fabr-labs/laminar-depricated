
import { createUserFlow } from "../../src/user-flow/create-user-flow.js";
import { testingMiddleware } from "../middleware/testing-middleware.js";
import { reduxStoreMiddleware } from "../../src/user-flow/middleware/redux-store/redux-store-middleware.js";
import { testReducer } from "../reducers/test-reducer.js";
import { createStore } from "../../node_modules/redux/dist/redux.js";

export const store = createStore(testReducer);

export const steps = testingMiddleware();
const middleware = [reduxStoreMiddleware(store), steps.middleware];

export const flow = createUserFlow({ middleware });