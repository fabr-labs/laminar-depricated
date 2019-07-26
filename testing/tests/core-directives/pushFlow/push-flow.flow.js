import { testFn } from "../../../helpers/test-fn.js";

export function secondaryFlow(args) { 
  return [
    { id: "id1", call: testFn, args },
    { id: "id2", call: testFn, args: 'step-2' },
    { id: "id3", call: testFn, args: 'step-3' }
  ];
}

export function pushFlowFn() { 
  return [
    { id: "id1b", call: testFn, args: 'step-1b' },
    { id: "id2b", pushFlow: (args) => ({ flow: args.useFlow ? () => {} : secondaryFlow }), args: { useFlow: false }, context: this },
    { id: "id3b", call: testFn, args: 'step-3b' }
  ];
}

export function pushFlow() { 
  return [
    { id: "id1b", call: testFn, args: 'step-1b' },
    { id: "id2b", pushFlow: { flow: secondaryFlow }, context: this },
    { id: "id3b", call: testFn, args: 'step-3b' }
  ];
}