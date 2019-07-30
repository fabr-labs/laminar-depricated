export const fetchMiddleware = ({ get, put, post, delete: del }) => next => directive => {

  if (directive.get) {
    return next({ call: get, args: directive.get, ...directive });
  }

  if (directive.put) {
    return next({ call: put, args: directive.put, ...directive });
  }

  if (directive.post) {
    return next({ call: post, args: directive.post, ...directive });
  }

  if (directive.delete) {
    return next({ call: del, args: directive.delete, ...directive });
  }

  return  next(directive);
};