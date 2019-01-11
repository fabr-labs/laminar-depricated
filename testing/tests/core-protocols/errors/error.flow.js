import { testFn } from "../../../helpers/test-fn.js";

export function errorFlow() { 
  return [
    { id: "id1" },
    { id: "id2", fn: testFn, args: 'step-2' },
    { id: "id3", fn: testFn, args: 'step-3' }
  ];
}