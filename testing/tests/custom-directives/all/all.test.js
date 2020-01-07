import { flow, flowEvents } from "../../../setup/create-test-flow-with-promise-all-middleware";
import { promiseAllFlow } from "./all.test.flow.js";

describe('Core directives', () => {

  beforeAll(() => {
    flowEvents.cleanup();
    flow.pushFlow({ flow: promiseAllFlow });
  });

  test('It runs the calls directive', async () => {
    expect.assertions(4);

    const response1 = await flowEvents.on({ id: 'id1' });
    expect(response1).toBe('step-1');

    const response2 = await flowEvents.on({ id: 'ida1' });
    expect(response2).toBe('async-1');

    const response3 = await flowEvents.on({ id: 'ida2' });
    expect(response3).toBe('async-2');

    const response4 = await flowEvents.on({ id: 'id3' });
    expect(response4).toBe('step-2');
  });
});