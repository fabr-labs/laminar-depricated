import { waitFlow } from '../../testing/tests/custom-directives/wait/wait.flow.js';
import { flowController } from '../flow-controller.js';

export function startWaitFlow() {
  flowController.pushFlow({ flow: waitFlow });
}