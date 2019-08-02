import { testFn } from "../../testing/helpers/test-fn.js";

async function get(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(response.status);

  console.log(response)

  // const data = await response.json();
  return response;
}


async function asyncFetchError() {
  // try {
    console.log('try get')
    return await get('./missingFile.json')
  // } catch (error) {
    // console.log('CAUGHT ISSUE IN FUNCTION!!! ', error)
  // }
}

function fetchError() {
  try {
    return get('./missingFile.json')
  } catch (error) {
    console.log('CAUGHT ISSUE IN FUNCTION!!! ', error)
  }
}

function throwError() {
  throw new Error('ERR !! BEEP BOOP !!');
}

function retryFetch({ flow, flowId, directive, context, error }) {
  console.warn('RETRY FETCH HANDLER!!!!', { flow, flowId, directive, context, error });
}


function sampleFn(args) {

  console.log('Fn called !!!!!!!!')

  console.log(args)
}

export function fetchErrorFlow() { 
  return [
    { id: "id1", call: sampleFn, args: 'step-1'},
    { id: "id2", call: testFn, args: 'step-2'},
    // { id: "id3", call: throwError, args: 'step-3', onError: [retryFetch] },
    { id: "id3", call: asyncFetchError, args: 'step-3', onError: [retryFetch] },
    // { id: "id3", call: fetchError, args: 'step-3', onError: [retryFetch] },
    { id: "id4", call: testFn, args: 'step-4' },
    { id: "id5", call: testFn, args: 'step-5' },
  ];
}

