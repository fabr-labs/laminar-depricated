
export class UserFlowProtocolError extends Error {}
export class UserFlowFunctionError extends Error {}

export class UserFlowError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class FlowGeneratorError extends UserFlowError {
  constructor(message, { flowID, stepIndex }) {
    super();
    this.flowID    = flowID;
    this.message   = message;
    this.stepIndex = stepIndex;
  }
}

export class MissingFnsError extends FlowGeneratorError {
  constructor(message, { flowID, stepIndex }) {
    super(message, { flowID, stepIndex });
  }
}

export class CreateUserFlowError extends UserFlowError {
  constructor(message) {
    super();
    this.message   = message;
  }
}

export class MissingFlowError extends CreateUserFlowError {
  constructor(message) {
    super(message);
  }
}

export function throwMissingFlowError() {
  throw new MissingFlowError('Missing flow from userFlow.pushFlow({ flow: Function })');
}
