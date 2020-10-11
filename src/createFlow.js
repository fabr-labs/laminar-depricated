import { pushFlowMiddleware } from './pushFlowMiddleware.js';
import { flowGenerator } from './flowGenerator.js';

export const laminar = {
  createFlow({ middleware: userMiddleware }) {
    const middleware = [...userMiddleware, pushFlowMiddleware].reverse();
    return {
      pushFlow: async function pushFlow({ flow, args = {} }) {
        for (const directive of flowGenerator({ flow, args, middleware, meta: { pushFlow } })) {
          await directive;
        }
      },
    };
  },
};
