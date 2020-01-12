import { flow, flowEvents } from "../../../setup/create-test-flow.js";
import { testErrorFlow } from "./on-error.flow.js";

describe('onError', () => {

  beforeAll(() => {
    flowEvents.cleanup();
    flow.pushFlow({ flow: testErrorFlow });
  });


  test(`It calls the error recovery flow`, async () => {
    expect.assertions(4);

    const responseA1 = await flowEvents.on({ id: 'A1' });
    expect(responseA1).toBe('#1');

    const responseB1 = await flowEvents.on({ id: 'B1' });
    expect(responseB1).toBe('#4');

    const responseA2 = await flowEvents.on({ id: 'A2' });
    expect(responseA2).toBe('#2');

    const responseA3 = await flowEvents.on({ id: 'A3' });
    expect(responseA3).toBe('#3');
  });
});