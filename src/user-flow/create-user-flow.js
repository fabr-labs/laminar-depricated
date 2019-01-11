import { flowGenerator } from "./flow-generator.js";

export function createUserFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow }) {
      for (let step of flowGenerator({ flow: flow.bind(this)(), middleware })) {
        await step;
      }
    }
  };
}