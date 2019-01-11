import { flow, steps } from "../../../setup/create-test-flow.js";
import { fnFlow } from "./fn.flow.js";


describe('Core protocols', () => {

  beforeAll(() => {
    steps.cleanup();
    flow.pushFlow({ flow: fnFlow });
  });

  test('It runs the fn protocol', async () => {
    expect.assertions(3);

    const response1 = await steps.on({ id: 'id1' });
    expect(response1).toBe('step-1');

    const response2 = await steps.on({ id: 'id2' });
    expect(response2).toBe('step-2');

    const response3 = await steps.on({ id: 'id3' });
    expect(response3).toBe('step-3');
  });
});