import { flow, flowEvents } from "../../../setup/create-test-flow.js";
import { pushFlow, pushFlowFn } from "./push-flow.flow.js";

describe('Core directives', () => {

  beforeEach(() => {
    flowEvents.cleanup();
  });

  test('It pushes a flow from a plain object', async () => {
    flow.pushFlow({ flow: pushFlow });
    expect.assertions(5);

    const response1 = await flowEvents.on({ id: 'id1b' });
    expect(response1).toBe('step-1b');

    const response2 = await flowEvents.on({ id: 'id1' });
    expect(response2).toStrictEqual({});

    const response3 = await flowEvents.on({ id: 'id2' });
    expect(response3).toBe('step-2');

    const response4 = await flowEvents.on({ id: 'id3' });
    expect(response4).toBe('step-3');

    const response5 = await flowEvents.on({ id: 'id3b' });
    expect(response5).toBe('step-3b');
  });
});