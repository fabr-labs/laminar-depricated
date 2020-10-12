/* eslint-disable prettier/prettier */
export const optionsMiddleware = (next, meta) => directive => {
  const response = next(directive);

  if (directive.options) {
    return response.then(result => {
      return meta.pushFlow({ flow: () => directive.options[result ? 'continue' : 'cancel'], args: directive.args });
    })
  }

  return response;
};