import { flowGenerator } from "./flow-generator.js";
import { throwMissingFlowError } from "./errors/custom-errors.js";

export function createUserFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError() }) {

      for (let step of flowGenerator({ flow: flow.bind(this)(), middleware })) {
        await step;
      }
    }
  };
}