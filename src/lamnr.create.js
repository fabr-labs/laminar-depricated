import { flowGeneratorFn } from "./lamnr.generator.js";
import { throwMissingFlowError } from "./lamnr.errors.js";

export function createFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError(), args = {}, goto, meta }) {
      for (const directive of flowGeneratorFn({ flow, goto, args, middleware })) {
        await directive({ ...meta, pushFlow });
      }
    }
  }
}
