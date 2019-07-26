import { flow, steps } from "../../../setup/create-test-flow.js";
import { saveResponse, saveResponseAsPushFlowArg } from "./save-response.flow.js";

describe('Core directives', () => {

  beforeAll(() => {
    steps.cleanup();
  });

  test('It saves a response and passes it as an argument', async () => {
    flow.pushFlow({ flow: saveResponse });
    expect.assertions(1);

    const response = await steps.on({ id: 'id2a' });
    expect(response).toEqual({ savedKey1: { saved: true }, passed: true });
  });

  test('It pushes a flow with a function as an argument', async () => {
    flow.pushFlow({ flow: saveResponseAsPushFlowArg });
    expect.assertions(5);

    const response1 = await steps.on({ id: 'id1b' });
    expect(response1).toStrictEqual({ useFlow: true });

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