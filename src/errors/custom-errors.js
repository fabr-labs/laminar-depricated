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
    this.flowId    = flowId;
    this.message   = message;
    this.step = step;
  }
}

export class MissingCallsError extends LaminarError {
  constructor(message, { flowId, step }) {
    super(message, { flowId, step });
  }
}

export class CreateFlowError extends LaminarError {
  constructor(message) {
    super();
    this.message   = message;
  }
}

export class MissingFlowError extends LaminarError {
  constructor(message) {
    super(message);
  }
}

export function throwMissingFlowError() {
  throw new MissingFlowError('Missing flow from flow.pushFlow({ flow: Function })');
}
