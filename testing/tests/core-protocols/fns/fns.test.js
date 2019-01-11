import { flow, steps } from "../../../setup/create-test-flow.js";
import { fnsFlow } from "./fns.flow.js";

describe('Core protocols', () => {

  beforeAll(() => {
    steps.cleanup();
    flow.pushFlow({ flow: fnsFlow });
  });

  test('It runs the fns protocol', async () => {
    expect.assertions(4);

    const response1 = await steps.on({ id: 'id1' });
    expect(response1).toBe('step-1');

    const response2 = await steps.on({ id: 'ida1' });
    expect(response2).toBe('async-1');

    const response3 = await steps.on({ id: 'ida2' });
    expect(response3).toBe('async-2');

    const response4 = await steps.on({ id: 'id3' });
    expect(response4).toBe('step-2');
  });
});