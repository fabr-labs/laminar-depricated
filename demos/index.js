import { startErrorFlow } from "./flows/error-flow.js";
import { startWaitFlow } from "./flows/wait-flow.js";
import { startCallFlow } from "./flows/call-flow.js";

document.getElementById('startErrorFlow').addEventListener('click', startErrorFlow);

document.getElementById('startWaitFlow').addEventListener('click', startWaitFlow);

document.getElementById('startCallFlow').addEventListener('click', startCallFlow);