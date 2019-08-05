import { pushFlow } from '../../testing/tests/core-directives/pushFlow/push-flow.flow.js';
import { flowController } from '../flow-controller.js';

export function startPushFlow() {
  flowController.pushFlow({ flow: pushFlow });
}