export class LamnrError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class FlowGeneratorFnError extends LamnrError {
  constructor(message, { id, index }) {
    super();
    this.message = message;
    this.flow = id;
    this.index = index;
  }
}

export class CreateFlowError extends LamnrError {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class MissingCallerError extends FlowGeneratorFnError {
  constructor({ flowName, index }) {
    console.error(`MissingCallerError - flow: ${ flowName }, index: ${ index + 1 } (index: ${ index })`);
    super(`A index must contain either a "call" property referencing a single function to be called, or a "calls" property referencing an array of functions to be called asynchronously.`, { flow: flowName, index });
  }
}

export class MissingFlowError extends CreateFlowError {
  constructor(message) {
    super(message);
  }
}

// Default property guards.

export function throwMissingFlowError() {
  throw new MissingFlowError('Missing flow from flow.pushFlow({ flow: Function })');
}

export function throwMissingCallerError({ flow, index }) {
  throw new MissingCallerError({ flowName: flow.name, index });
}