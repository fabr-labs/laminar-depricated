export class LaminarError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class DirectiveError extends LaminarError {}
export class FunctionError extends LaminarError {}

export class flowGeneratorFnError extends LaminarError {
  constructor(message, { flowId, step }) {
    super();
    this.message = message;
    this.flowId = flowId;
    this.step = step;
  }
}

export class CreateFlowError extends LaminarError {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class MissingCallerError extends flowGeneratorFnError {
  constructor({ flowId, step }) {
    console.error(`MissingCallerError - flow: ${ flowId }, step: ${ step + 1 } (index: ${ step })`);
    super(`A step must contain either a "call" property referencing a single function to be called, or a "calls" property referencing an array of functions to be called asynchronously.`, { flowId, step });
  }
}

export class MissingFlowError extends flowGeneratorFnError {
  constructor(message) {
    super(message);
  }
}

// Default property guard.
export function throwMissingFlowError() {
  throw new MissingFlowError('Missing flow from flow.pushFlow({ flow: Function })');
}
