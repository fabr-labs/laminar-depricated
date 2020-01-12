import { flowGeneratorFn } from "./lamnr.generator.js";
import { Required } from "./utilities/custom-errors.js";

export function createFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow = () => { throw new Required(`flow`) }, args = {}, goto, meta }) {
      for (const directive of flowGeneratorFn({ flow, goto, args, middleware })) {
        await directive({ ...meta, pushFlow });
      }
    }
  }
}
