import { call } from './call.js';
import { applyMiddleware } from './applyMiddleware.js';

export function* flowGenerator({ flow, args, middleware, meta }) {
  for (const directive of flow(args)) {
    yield applyMiddleware(call, middleware, { ...meta, flow })(directive, { ...meta, flow });
  }
}
