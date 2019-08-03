import { flowGeneratorFn } from "./flow.generator.js";
import { throwMissingFlowError } from "./errors/laminar-errors.js";

export function createFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError(), args = {}, goto = null, meta }) {
      const generator = flowGeneratorFn({ flow, goto, args, middleware });
      for (const directive of generator) {
        await directive({ pushFlow, generator, ...meta });
      }
    }
  }
}