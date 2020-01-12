export const fetchMiddleware = ({ get, put, post, delete: del }) => next => ({ directive, meta }) => {

  if (directive.get) {
    return next({ directive: { call: get, args: directive.get, ...directive }, meta });
  }

  if (directive.put) {
    return next({ directive: { call: put, args: directive.put, ...directive }, meta });
  }

  if (directive.post) {
    return next({ directive: { call: post, args: directive.post, ...directive }, meta });
  }

  if (directive.delete) {
    return next({ directive: { call: del, args: directive.delete, ...directive }, meta });
  }

  return  next({ directive, meta });
};
