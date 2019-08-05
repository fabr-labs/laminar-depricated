import { errorFlow } from '../../testing/tests/core-directives/onError/error.flow.js';
import { flowController } from '../flow-controller.js';

export function startErrorFlow() {
  flowController.pushFlow({ flow: errorFlow });
}