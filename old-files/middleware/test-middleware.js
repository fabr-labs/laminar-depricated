export const testMiddleware = next => directive => {

  console.log('directive', directive);
const result = next(directive);

  // console.log('testMiddleware - result', result)

  return result;

};