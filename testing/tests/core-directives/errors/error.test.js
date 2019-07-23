import { flow, steps } from "../../../setup/create-test-flow.js";
import { errorFlow } from "./error.flow.js";

import { MissingCallerError } from '../../../../src/errors/custom-errors.js';

describe('Error directives', () => {

  beforeAll(() => {
    console.error = jest.fn();
    steps.cleanup();
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  test(`It throws an error when 'call' and 'calls' are both undefined`, async () => {
    expect(() => {
      flow.pushFlow({ flow: errorFlow });
    }).toThrow();
  });
});