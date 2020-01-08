import { flow, flowEvents } from "../../../setup/create-test-flow-with-reduce-middleware.js";
import { reduceFlow } from "./reduce-middleware.flow.js";

describe('Custom directives', () => {

  beforeAll(() => {
    flowEvents.cleanup();
    flow.pushFlow({ flow: reduceFlow });
  });

  test('Reduces the directive response', async () => {
    expect.assertions(1);
  
    const response = await flowEvents.on({ id: 'id1' });
    
    expect(response).toEqual([2, 3, 4, 5, 6, 7]);

  });
});