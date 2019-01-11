import { createWait } from "./wait.js";

const promiseStore = createWait();

export const wait = promiseStore.wait;
export const resolveWait = promiseStore.resolveWait;
export const removeWait = promiseStore.removeWait;