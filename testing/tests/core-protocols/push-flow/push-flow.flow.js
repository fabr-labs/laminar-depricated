import { testCall } from "../../../helpers/test-call.js";
import { callFlow } from "../call/call.flow.js";

export function pushFlow() { 
  return [
    { id: "id1b", call: testCall, args: 'step-1b' },
    { id: "id2b", call: this.pushFlow, args: { flow: callFlow }},
    { id: "id3b", call: testCall, args: 'step-3b' }
  ];
}