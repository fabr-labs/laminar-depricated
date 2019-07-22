import { testCall } from "../../../helpers/test-call.js";
import { delayCall } from "../../../helpers/test-delay-call.js";

export function callsFlow() {
  return [
    { id: "id1", call: testCall, args: 'step-1' },
    { id: "id2", calls: [{ id: "ida1", call: delayCall, args: 'async-1' }, { id: "ida2", call: testCall, args: 'async-2' }] },
    { id: "id3", call: testCall, args: 'step-2' }
  ];
}