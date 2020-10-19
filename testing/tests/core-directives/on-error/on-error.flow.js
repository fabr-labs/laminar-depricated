import { testFn } from '../../../helpers/test-fn.js';

function generateErrorFn(i = 0) {
  let errorTries = i + 1;

  console.log('ERR');

  return (arg) => {
    errorTries -= 1;
    if (errorTries) throw new Error(`sampleError`);
    return arg;
  }
}


export function onErrorFlow() { 
  return [
    { id: `B1`, call: testFn, args: `#4` }
  ];
}

export function onErrorMiddleware(next, meta) {
  return async ({ directive, error, tries, resolved }) => {

    console.log('onErrorMiddleware', next, meta)

    if (error.message === `sampleError`) {
      meta.pushFlow({ flow: onErrorFlow });
    }
  
    const result = next({ directive, error, tries, resolved });
  
    return result;
  };
} 

export function testErrorFlow() { 
  const errorFn = generateErrorFn(1);

  return [
    { id: `A1`, call: testFn,  args: `#1` },
    { id: `A2`, call: errorFn, args: `#2`, onError: [onErrorMiddleware] },
    { id: `A3`, call: testFn,  args: `#3` },
  ];
}

