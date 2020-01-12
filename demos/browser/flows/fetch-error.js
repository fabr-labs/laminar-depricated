import { fetchErrorFlow } from '../controllers/fetch-error.js';
import { flowController } from '../flow-controller.js';

export function startFetchErrorFlow() {
  flowController.pushFlow({ flow: fetchErrorFlow });
}