import { testFn } from "../helpers/test-fn.js";
import { throwError } from "../functions/throw-err-functions.js";

async function get(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(response.status);

  console.log(response)
  return response;
}


async function asyncFetchError() {
    console.log('try get')
    return await get('./missingFile.json')
}

function fetchError() {
  try {
    return get('./missingFile.json')
  } catch (error) {
    console.log('CAUGHT ISSUE IN FUNCTION!!! ', error)
  }
}

function sampleFn(args) {
  console.log(args)
}

export const onErrorMiddleware = next => async ({ directive, meta, error, tries, resolved }) => {

  console.log('MIDDLEWARE CAUGHT ERROR', error);

  const result = next({ directive, meta, error, tries, resolved });

  return result;
};

export function fetchErrorFlow() { 
  return [
    { id: "A", call: sampleFn, args: '#1'},
    { id: "B", call: testFn, args: '#2'},
    { id: "C", call: throwError, args: '#3a', onError: [onErrorMiddleware] },
    // { id: "D", call: asyncFetchError, args: '#3b', onError: [onErrorMiddleware] },
    // { id: "E", call: fetchError, args: '#3c', onError: [onErrorMiddleware] },
    // { id: "ThisIsaSpecialStep", args: 'specialValue'},
    { id: "F", call: testFn, args: '#4' },
    { id: "G", call: testFn, args: '#5' },
  ];
}

