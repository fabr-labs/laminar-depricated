import { flowGenerator } from "./flow-generator.js";
import { throwMissingFlowError } from "./errors/custom-errors.js";

export function createFlow({ middleware=[], idPool=1 }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError() }) {
      for (const step of flowGenerator({ flow: flow.bind(this)(), flowId: (idPool++), middleware })) {
        await step;
      }
    }
  };
}