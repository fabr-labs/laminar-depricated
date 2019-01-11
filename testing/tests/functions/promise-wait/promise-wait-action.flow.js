import { wait, resolveWait, removeWait } from "../../../../src/user-flow/functions/wait/promise-wait-function.js";

export function waitFlow() { 
  return [
    { id: "zid1", fn: () => false },
    { id: "zid2", fn: wait, args: { on: 'waitTest' }},
    { id: "zid3", fn: () => true },
  ];
}






// { id: "id1", wait: { on: 'somethingAsync' }},

// { id: "id1", fn: wait, on: 'somethingAsync', async: true },

// { id: "id1", wait: { on: 'somethingAsync', async: true }},

// { id: "id1", fn: wait, args: { on: 'somethingAsync', async: true }},

// { id: "id1", fn: dispatch, args: { type: 'DO_SOMETHING' }},

// { id: "conditionalFn", if: dispatch, then: { fn: wait, on: 'somethingAsync' }, else: { fn: wait, on: 'somethingAsync' }}