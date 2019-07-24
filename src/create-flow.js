import { flowGeneratorFn } from "./flow-generator-fn.js";
import { throwMissingFlowError } from "./errors/laminar-errors.js";

export function createFlow({ middleware=[], idPool=1 }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError(), args = {}}) {
      for (const step of flowGeneratorFn({ flow: flow.bind(this)(args), flowId: (idPool++), middleware })) {
        await step;
      }
    }
  };
}