import { pushFlowMiddleware } from './pushFlowMiddleware.js';
import { flowGenerator } from './flowGenerator.js';

export function createFlow({ middleware: userMiddleware }) {
  const middleware = [...userMiddleware, pushFlowMiddleware];
  return {
    pushFlow: async function pushFlow({ flow, args = {} }) {
      for (const directive of flowGenerator({ flow, args, middleware, meta: { pushFlow } })) {
        await directive;
      }
    },
  };
}
