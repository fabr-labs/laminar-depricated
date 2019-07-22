import { testCall } from "../../../helpers/test-call.js";

export function callFlow() { 
  return [
    { id: "id1", call: testCall, args: 'step-1' },
    { id: "id2", call: testCall, args: 'step-2' },
    { id: "id3", call: testCall, args: 'step-3' }
  ];
}