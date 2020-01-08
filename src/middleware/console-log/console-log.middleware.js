export const consoleLogMiddleware = logAll => next => ({ directive, meta }) => {

  if (directive.log || logAll) {
    console.group(`%c${directive.id}!`, `color: green; font-size:11px; font-weight: bold;`);
    console.log(directive);
  }

  const result = next({ directive, meta });

  if (directive.log || logAll) {
    console.log(result);
    console.groupEnd();
  }
  
  return result;
};