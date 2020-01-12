import { testFn } from "../../../helpers/test-fn.js";

export function callFlow() { 
  return [
    { id: "id1", call: testFn, args: 'step-1' },
    { id: "id2", call: testFn, args: 'step-2' },
    { id: "id3", call: testFn, args: 'step-3' }
  ];
}