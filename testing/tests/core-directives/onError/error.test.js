import { flow, steps } from "../../../setup/create-test-flow.js";
import { errorFlow } from "./error.flow.js";

import { MissingCallerError } from '../../../../src/errors/laminar-errors.js';

describe.skip('Error directives', () => {
  test(`It throws an error when 'call' and 'calls' are both undefined`, () => {
    // const spy = jest.spyOn(global.console, 'error')

    // expect(() => {
    //   console.log('TESTING FUNCTION !!!!!!!!!!')
    //   flow.pushFlow({ flow: errorFlow });
    // }).toThrow();

    // try {
    //   flow.pushFlow({ flow: errorFlow });
    //   console.log('try error')
    // } catch (error) {
    //   expect(1).toBe(1);
    //   console.log('catch error')
    //   console.log(error)
    // }
    // console.log('CALLED BEFORE ERROR')
    // // global.console = {error: jest.fn()}
    // flow.pushFlow({ flow: errorFlow });
    // // expect(console.warn).toBeCalled();
    // // expect(spy).toHaveBeenCalled();
    // console.log('CALLED BEFORE TIMEOUT')

    // setTimeout(() => {
    //   console.log('CALLED AFTER TIMEOUT')
    //   expect(spy).toHaveBeenCalled();
    //   done();
    // }, 1000);


    // expect(console.warn).toBeCalled();
    // expect(console.error).toHaveBeenCalledTimes(1);
    // expect(console.error).toHaveBeenCalledWith(`MissingCallerError - flow: 1, step: 2 (index: 1)`);

  });
});