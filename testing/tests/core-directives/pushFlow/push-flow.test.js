import { flow, steps } from "../../../setup/create-test-flow.js";
import { pushFlow, pushFlowFn } from "./push-flow.flow.js";

describe('Core directives', () => {

  beforeEach(() => {
    steps.cleanup();
  });

  test('It pushes a flow with a function as an argument', async () => {
    flow.pushFlow({ flow: pushFlowFn });
    expect.assertions(5);

    const response1 = await steps.on({ id: 'id1b' });
    expect(response1).toBe('step-1b');

    const response2 = await steps.on({ id: 'id1' });
    expect(response2).toStrictEqual({ useFlow: false });

    const response3 = await steps.on({ id: 'id2' });
    expect(response3).toBe('step-2');

    const response4 = await steps.on({ id: 'id3' });
    expect(response4).toBe('step-3');

    const response5 = await steps.on({ id: 'id3b' });
    expect(response5).toBe('step-3b');
  });

  test('It pushes a flow from a plain object', async () => {
    flow.pushFlow({ flow: pushFlow });
    expect.assertions(5);

    const response1 = await steps.on({ id: 'id1b' });
    expect(response1).toBe('step-1b');

    const response2 = await steps.on({ id: 'id1' });
    expect(response2).toStrictEqual({});

    const response3 = await steps.on({ id: 'id2' });
    expect(response3).toBe('step-2');

    const response4 = await steps.on({ id: 'id3' });
    expect(response4).toBe('step-3');

    const response5 = await steps.on({ id: 'id3b' });
    expect(response5).toBe('step-3b');
  });
});