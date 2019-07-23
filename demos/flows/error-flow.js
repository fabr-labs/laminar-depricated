import { errorFlow } from '../../testing/tests/core-directives/errors/error.flow.js';
import { stack } from '../flow-stack.js';

export function startErrorFlow() {
  stack.pushFlow({ flow: errorFlow });
}