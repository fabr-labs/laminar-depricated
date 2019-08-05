import { startErrorFlow } from "./flows/error-flow.js";
import { startWaitFlow } from "./flows/wait-flow.js";
import { startCallFlow } from "./flows/call-flow.js";
import { startFetchErrorFlow } from "./flows/fetch-error.js";
import { startPushFlow } from "./flows/push-flow.js";

document.getElementById('startErrorFlow').addEventListener('click', startErrorFlow);

document.getElementById('startWaitFlow').addEventListener('click', startWaitFlow);

document.getElementById('startCallFlow').addEventListener('click', startCallFlow);

document.getElementById('startFetchErrorFlow').addEventListener('click', startFetchErrorFlow);

document.getElementById('startPushFlow').addEventListener('click', startPushFlow);