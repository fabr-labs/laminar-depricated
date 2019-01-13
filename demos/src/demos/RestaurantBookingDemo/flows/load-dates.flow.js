export function loadDates() { 
  return [
    { id: "id2", fn: console.log, args: 'Step 1' },
    { id: "id3", fn: console.log, args: 'Step 2' },
    { id: "id3", fns: [{ fn: console.log, args: 'Async 1' }, { fn: console.log, args: 'Async 2' }] }
  ]
}