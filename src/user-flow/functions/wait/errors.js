export class Reflow_MissingPromise       extends Error {}
export class Reflow_MissingRequiredParam extends Error {}

export function required(param) {
  throw new Reflow_MissingRequiredParam(param);
}