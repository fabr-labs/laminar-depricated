import { flow, flowEvents, store } from "../../../setup/create-test-flow-with-store-middleware.js";
import { storeFlow } from "./redux-store-middleware.flow.js";

describe('Custom directives', () => {

  beforeAll(() => {
    flowEvents.cleanup();
    flow.pushFlow({ flow: storeFlow });
  });

  test('Store applies response to redux store', async () => {
    expect.assertions(1);
  
    await flowEvents.on({ id: 'id1' });
    const state = store.getState();
    
    expect(state).toEqual({ one: 1, two: 2, three: 3 });

  });
});