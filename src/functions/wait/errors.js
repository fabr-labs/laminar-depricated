export class MissingPromise       extends Error {}
export class MissingRequiredParam extends Error {}

export function required(param) {
  throw new MissingRequiredParam(param);
}