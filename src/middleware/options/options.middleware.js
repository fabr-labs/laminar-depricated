/* eslint-disable prettier/prettier */
const optionsMiddleware = next => ({ directive, meta }) => {
  const response = next({ directive, meta });

  if (directive.options) {
    return response.then(result => {
      return meta.pushFlow({ flow: () => directive.options[result ? 'continue' : 'cancel'], args: directive.args });
    })
  }

  return response;
};

export { optionsMiddleware };