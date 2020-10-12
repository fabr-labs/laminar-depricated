export const httpErrorHandlerMiddleware = (globalErrorHandlers) => next => (directive) => {
 
  if (directive.get || directive.put || directive.post || directive.delete) {
    const result = next({ ...directive, onError: [...globalErrorHandlers, ...(directive.onError || [])] });
    return result;
  }

  const result = next(directive);
  return result;
};