import { testFn } from "../../../helpers/test-fn.js";
import { delayFn } from "../../../helpers/test-delay-fn.js";

export function fnsFlow() {
  return [
    { id: "id1", fn: testFn, args: 'step-1' },
    { id: "id2", fns: [{ id: "ida1", fn: delayFn, args: 'async-1' }, { id: "ida2", fn: testFn, args: 'async-2' }] },
    { id: "id3", fn: testFn, args: 'step-2' }
  ];
}