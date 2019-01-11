export function callWithProperty(fn, property) {
  return function (step) {
    try {
      return fn(step[property]);
    } catch (error) {
      console.warn(step);
      throw error;
    }
  };
}