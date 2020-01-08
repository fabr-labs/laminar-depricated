const globalHttpErrorHandlerMiddleware = (globalErrorHandlers) => next => ({ directive, meta }) => {
 
  if (directive.get || directive.put || directive.post || directive.delete) {
    const result = next({ directive: { ...directive, onError: [...globalErrorHandlers, ...(directive.onError || [])] }, meta });
    return result;
  }

  const result = next({ directive, meta });
  return result;
};

export default globalHttpErrorHandlerMiddleware;