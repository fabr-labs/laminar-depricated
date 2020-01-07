import { flow, flowEvents, resolveWait } from "../../../setup/create-test-flow-with-wait-middleware.js";
import { waitFlow } from "./wait.flow.js";


describe('wait', () => {

  beforeAll(() => {
    flowEvents.cleanup();
    flow.pushFlow({ flow: waitFlow });
  });

  test('WaitFor function waits for ResolveWait', async () => {
    expect.assertions(2);

    expect(flowEvents.unresolved({ id: 'zid2' })).toEqual(true);

    resolveWait({ on: 'waitTest' });

    await flowEvents.on({ id: 'zid2' });

    expect(flowEvents.resolved({ id: 'zid2' })).toEqual(true);

  });
});