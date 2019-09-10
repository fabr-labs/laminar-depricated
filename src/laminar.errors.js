export class LaminarError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class DirectiveError extends LaminarError {}
export class FunctionError extends LaminarError {}

export class FlowGeneratorFnError extends LaminarError {
  constructor(message, { id, step }) {
    super();
    this.message = message;
    this.flow = id;
    this.step = step;
  }
}

export class CreateFlowError extends LaminarError {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class MissingCallerError extends FlowGeneratorFnError {
  constructor({ flowName, step }) {
    console.error(`MissingCallerError - flow: ${ flowName }, step: ${ step + 1 } (index: ${ step })`);
    super(`A step must contain either a "call" property referencing a single function to be called, or a "calls" property referencing an array of functions to be called asynchronously.`, { flow: flowName, step });
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

export function throwMissingCallerError({ flow, step }) {
  throw new MissingCallerError({ flowName: flow.name, step });
}