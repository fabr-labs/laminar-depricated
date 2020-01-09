import { testErrorFlow } from '../../testing/tests/core-directives/on-error/on-error.flow.js';
import { flowController } from '../flow-controller.js';

export function startErrorFlow() {
  flowController.pushFlow({ flow: testErrorFlow });
}