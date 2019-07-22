import { flow, steps } from "../../../setup/create-test-flow.js";
import { errorFlow } from "./error.flow.js";

describe('Error directives', () => {

  beforeAll(() => {
    console.error = jest.fn();
    steps.cleanup();
    flow.pushFlow({ flow: errorFlow });
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  test('It returns an error when call and calls are both undefined', async () => {
    expect.assertions(2);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(`A directive must contain either a 'call' property passing a single function to be called, or a 'calls' property passing an array of functions to be called asynchronously.`, { "id": "id1" });
  });
});