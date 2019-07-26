import { callFlow } from '../../testing/tests/core-directives/call/call.flow.js';
import { flowController } from '../flow-controller.js';

export function startCallFlow() {
  flowController.pushFlow({ flow: callFlow });
}