export const reduxFetchMiddleware = ({ get, put, post, delete: del }) => next => directive => {

  if (directive.get) {
    return { call: get, args: directive.get, ...directive }
  }

  if (directive.put) {
    return { call: put, args: directive.put, ...directive }
  }

  if (directive.post) {
    return { call: post, args: directive.post, ...directive }
  }

  if (directive.delete) {
    return { call: del, args: directive.delete, ...directive }
  }

  return  next(directive);
};