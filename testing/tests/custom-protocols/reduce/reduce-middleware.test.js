import { flow, steps } from "../../../setup/create-test-flow-with-reduce-middleware.js";
import { reduceFlow } from "./reduce-middleware.flow.js";

describe('Custom directives', () => {

  beforeAll(() => {
    steps.cleanup();
    flow.pushFlow({ flow: reduceFlow });
  });

  test('Reduces the directive response', async () => {
    expect.assertions(1);
  
    const response = await steps.on({ id: 'id1' });
    
    expect(response).toEqual([2, 3, 4, 5, 6, 7]);

  });
});