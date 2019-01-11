export function testError(id) {
  class SimpleTestError extends Error {}
  throw new SimpleTestError('This went wrong', id);
}