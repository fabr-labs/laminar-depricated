export function waitFlow() { 
  return [
    { id: "zid1", call: () => false },
    { id: "zid2", wait: { on: 'waitTest' }},
    { id: "zid3", call: () => true },
  ];
}


// { id: "id1", wait: { on: 'somethingAsync' }},

// { id: "id1", call: wait, on: 'somethingAsync', async: true },

// { id: "id1", wait: { on: 'somethingAsync', async: true }},

// { id: "id1", call: wait, args: { on: 'somethingAsync', async: true }},

// { id: "id1", call: dispatch, args: { type: 'DO_SOMETHING' }},

// { id: "conditionalFn", if: dispatch, then: { call: wait, on: 'somethingAsync' }, else: { call: wait, on: 'somethingAsync' }}