export class ActionNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "ActionNotFoundError";
  }
}