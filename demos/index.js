import { startErrorFlow } from "./flows/error-flow.js";
import { startWaitFlow } from "./flows/wait-flow.js";

document.getElementById('startErrorFlow').addEventListener('click', startErrorFlow);

document.getElementById('startWaitFlow').addEventListener('click', startWaitFlow);