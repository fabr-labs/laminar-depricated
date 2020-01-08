import { flow, flowEvents } from "../../../setup/create-test-flow.js";
import { saveResponse, useResponseAsPushFlowArg } from "./save-response.flow.js";

describe('Core directives', () => {

  beforeAll(() => {
    flowEvents.cleanup();
  });

  test('It saves a response and passes it as an argument', async () => {
    flow.pushFlow({ flow: saveResponse });
    expect.assertions(1);

    const response = await flowEvents.on({ id: 'id2a' });
    expect(response).toEqual({ savedKey1: { saved: true }, passed: true });
  });

  test('It saves a response from and passes it as an argument', async () => {
    flow.pushFlow({ flow: useResponseAsPushFlowArg });
    expect.assertions(5);

    const response1 = await flowEvents.on({ id: 'id1b' });
    expect(response1).toStrictEqual({ useFlow: true });

    const response2 = await flowEvents.on({ id: 'id1' });
    expect(response2).toStrictEqual({passed: true});

    const response3 = await flowEvents.on({ id: 'id2' });
    expect(response3).toBe('step-2');

    const response4 = await flowEvents.on({ id: 'id3' });
    expect(response4).toBe('step-3');

    const response5 = await flowEvents.on({ id: 'id3b' });
    expect(response5).toBe('step-3b');
  });
});