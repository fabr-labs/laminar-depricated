import { testFn } from "../../../helpers/test-fn.js";

export function fnFlow() { 
  return [
    { id: "id1", fn: testFn, args: 'step-1' },
    { id: "id2", fn: testFn, args: 'step-2' },
    { id: "id3", fn: testFn, args: 'step-3' }
  ];
}