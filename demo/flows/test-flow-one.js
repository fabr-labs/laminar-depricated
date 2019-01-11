import { testFlowTwo } from "./test-flow-two.js";
import { testDelay } from "../functions/test-delay.js";
import { testError } from "../functions/test-error.js";

export function testFlowOne() { 
  return [
    { id: "id1", fn: this.pushFlow, args: { steps: testFlowTwo }},
    { id: "id2", fn: console.log, args: 'step-6 changePage first-page' },
    { id: "id3", fn: console.log, args: 'step-1 changePage first-page' },
    { id: "id4", fn: testDelay, args: 7 }
  ]
}