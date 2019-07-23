import { testFn } from "../../../helpers/test-fn.js";
import { callFlow } from "../call/call.flow.js";

export function pushFlow() { 
  return [
    { id: "id1b", call: testFn, args: 'step-1b' },
    { id: "id2b", call: this.pushFlow, args: { flow: callFlow }},
    { id: "id3b", call: testFn, args: 'step-3b' }
  ];
}