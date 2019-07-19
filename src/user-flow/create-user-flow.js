import { flowGenerator } from "./flow-generator.js";
import { throwMissingFlowError } from "./errors/custom-errors.js";

export function createUserFlow({ middleware=[], idPool=1 }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError() }) {

      console.log(flow);

      for (let step of flowGenerator({ flow: flow.bind(this)(), flowId: (idPool++), middleware })) {
        await step;
      }
    }
  };
}