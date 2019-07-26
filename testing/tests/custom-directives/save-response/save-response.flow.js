import { testFn } from "../../../helpers/test-fn.js";
import { callFlow } from "../../core-directives/call/call.flow.js";

export function saveResponse() { 
  return [
    { id: "id1a", call: () => ({ saved: true }), saveResponse: 'savedKey1' },
    { id: "id2a", call: (args) => args, useResponse: 'savedKey1', args: { passed: true }}
  ];
}

export function saveResponseAsPushFlowArg() { 
  return [
    { id: "id1b", call: () => ({ saved: true }), saveResponse: 'savedKey' },
    { id: "id2b", pushFlow: (args) => ({ flow: args.useFlow ? () => {} : callFlow }), args: { useFlow: false }, context: this },
    { id: "id3b", call: (args) => args, args: { passed: true }}
  ];
}