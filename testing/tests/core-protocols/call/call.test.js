import { flow, steps } from "../../../setup/create-test-flow.js";
import { callFlow } from "./call.flow.js";


describe('Core directives', () => {

  beforeAll(() => {
    steps.cleanup();
    flow.pushFlow({ flow: callFlow });
  });

  test('It runs the call directives', async () => {
    expect.assertions(3);

    const response1 = await steps.on({ id: 'id1' });
    expect(response1).toBe('step-1');

    const response2 = await steps.on({ id: 'id2' });
    expect(response2).toBe('step-2');

    const response3 = await steps.on({ id: 'id3' });
    expect(response3).toBe('step-3');
  });
});