import { testFn } from "../../../helpers/test-fn.js";
import { delayFn } from "../../../helpers/test-delay-fn.js";

export function promiseAllFlow() {
  return [
    { id: "id1", call: testFn, args: 'step-1' },
    { id: "id2", all: [{ id: "ida1", call: delayFn, args: 'async-1' }, { id: "ida2", call: testFn, args: 'async-2' }] },
    { id: "id3", call: testFn, args: 'step-2' }
  ];
}