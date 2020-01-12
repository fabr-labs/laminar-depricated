import { testFn } from '../../../helpers/test-fn.js';

function generateErrorFn(i = 0) {
  let errorTries = i + 1;
  return (arg) => {
    errorTries -= 1;
    if (errorTries) throw new Error(`sampleError`);
    return arg;
  }
}

export const onErrorMiddleware = next => async ({ directive, meta, error, tries, resolved }) => {

  if (error.message === `sampleError`) {
    meta.pushFlow({ flow: onErrorFlow });
  }

  const result = next({ directive, meta, error, tries, resolved });

  return result;
};

export function testErrorFlow() { 
  const errorFn = generateErrorFn(1);

  return [
    { id: `A1`, call: testFn,  args: `#1` },
    { id: `A2`, call: errorFn, args: `#2`, onError: [onErrorMiddleware] },
    { id: `A3`, call: testFn,  args: `#3` },
  ];
}

export function onErrorFlow() { 
  return [
    { id: `B1`, call: testFn, args: `#4` }
  ];
}
