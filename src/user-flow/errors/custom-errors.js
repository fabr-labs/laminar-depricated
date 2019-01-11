
export class UserFlowProtocolError extends Error {}
export class UserFlowFunctionError extends Error {}

export class UserFlowError extends Error {
  constructor(message, { flowID, stepIndex }) {
    super();
    this.flowID    = flowID;
    this.message   = message;
    this.stepIndex = stepIndex;
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