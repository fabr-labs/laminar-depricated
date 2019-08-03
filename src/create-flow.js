import { flowGeneratorFn } from "./flow-generator-fn.js";
import { throwMissingFlowError } from "./errors/laminar-errors.js";

export function createFlow({ middleware=[], idPool=1 }) {
  return {
    // Attaching flowGeneratorFn here allows us to access the generator via 'this' in the flowGeneratorFn. 
    flowGeneratorFn: flowGeneratorFn,
    pushFlow: async function pushFlow({ flow=throwMissingFlowError(), args = {}, goto = null }) {
      this.generator = this.flowGeneratorFn({ flow, flowId: (idPool++), goto, args, middleware, context: this });
      for (const directive of this.generator) {
        await directive;
      }
    }
  };
}