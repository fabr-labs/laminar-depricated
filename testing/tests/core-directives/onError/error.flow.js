import { testFn } from "../../../helpers/test-fn.js";

export function errorFlow() { 
  return [
    { id: "id1", call: testFn, args: 'step-1'},
    { id: "id2", args: 'step-2' },
    { id: "id3", call: testFn, args: 'step-3' }
  ];
}