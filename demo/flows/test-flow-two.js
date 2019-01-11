import { testDelay } from "../functions/test-delay.js";
import { testError } from "../functions/test-error.js";

export function testFlowTwo() {
  return [
    { id: "id6", fn: console.log, args: 'step-2 changePage first-page' },
    { id: "id5", fns: [{ fn: console.log, args: ('step-8 do something') },  { fn: console.log, args: ('step-9 do something') }, { id: "id8a", fn: testError }] },
    { id: "id7", fn: console.log, args: 'step-3 changePage first-page' },
    { id: "id8", fn: testDelay, args: 4 },
    // { id: "id8a", fn: testError },
    { id: "id9", fn: () => console.log('step-5 do something') }
  ]
}