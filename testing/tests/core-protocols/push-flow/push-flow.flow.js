import { testFn } from "../../../helpers/test-fn.js";
import { fnFlow } from "../fn/fn.flow.js";

export function pushFlow() { 
  return [
    { id: "id1b", fn: testFn, args: 'step-1b' },
    { id: "id2b", fn: this.pushFlow, args: { flow: fnFlow }},
    { id: "id3b", fn: testFn, args: 'step-3b' }
  ];
}