import { flowGeneratorFn } from "./lamnr.generator.js";
import { throwMissingFlowError } from "./lamnr.errors.js";

export function createFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError(), args = {}, goto, meta }) {
      const generator = flowGeneratorFn({ flow, goto, args, middleware });
      for (const directive of generator) {
        await directive({ ...meta, pushFlow, generator, flow });
      }
    }
  }
}
