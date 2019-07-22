import { flow, steps } from "../../../setup/create-test-flow-with-wait-middleware.js";
import { resolveWait } from "../../../../src/functions/wait/promise-wait-function.js";
import { waitFlow } from "./promise-wait-action.flow.js";


describe('wait', () => {

  beforeAll(() => {
    steps.cleanup();
    flow.pushFlow({ flow: waitFlow });
  });

  test('WaitFor function waits for ResolveWait', async () => {
    expect.assertions(2);

    expect(steps.unresolved({ id: 'zid2' })).toEqual(true);

    resolveWait({ on: 'waitTest' });

    await steps.on({ id: 'zid2' });

    expect(steps.resolved({ id: 'zid2' })).toEqual(true);

  });
});