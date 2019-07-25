export function chainFunctions(functions, args) {
  return Array.isArray(functions) ? functions.reduce((result, fn) => fn(result), args) : functions(args);
}