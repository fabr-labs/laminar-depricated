import { flow, steps } from "../../../setup/create-test-flow.js";
import { pushFlow } from "./push-flow.flow.js";

describe('Core directives', () => {

  beforeAll(() => {
    steps.cleanup();
    flow.pushFlow({ flow: pushFlow });
  });

  test('It runs the call directive', async () => {
    expect.assertions(5);

    const response1 = await steps.on({ id: 'id1b' });
    expect(response1).toBe('step-1b');

    const response2 = await steps.on({ id: 'id1' });
    expect(response2).toBe('step-1');

    const response3 = await steps.on({ id: 'id2' });
    expect(response3).toBe('step-2');

    const response4 = await steps.on({ id: 'id3' });
    expect(response4).toBe('step-3');

    const response5 = await steps.on({ id: 'id3b' });
    expect(response5).toBe('step-3b');
  });
});