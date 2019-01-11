import { flow, steps } from "../../../setup/create-test-flow.js";
import { errorFlow } from "./error.flow.js";

describe('Error protocols', () => {

  beforeAll(() => {
    console.error = jest.fn();
    steps.cleanup();
    flow.pushFlow({ flow: errorFlow });
  });

  afterAll(() => {
    console.log.mockRestore();
  });

  test('It returns an error when fn and fns are both undefined', async () => {
    expect.assertions(2);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(`A directive must contain either a 'fn' property passing a single function to be called, or a 'fns' property passing an array of functions to be called asynchronously.`, { "id": "id1" });
  });
});