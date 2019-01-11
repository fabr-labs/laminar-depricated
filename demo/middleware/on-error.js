export const testErrorMiddleware = next => directive => {

  // console.log('2', directive.id)

  // try {
    const result = next(directive);
  // } catch (error) {
  //   console.log('Caught error', error)
  //   throw error
  // }

  return result;
};