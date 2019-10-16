import { applyMiddleware } from './utilities/apply-middleware.js';
import { gotoStep } from './utilities/goto-step.js';
import { callFn } from './laminar.call.js';

export function* flowGeneratorFn({ flow, middleware, args, goto }) {
  for (const [index, directive] of gotoStep(goto, flow(args)).entries()) {
    try {
      if (directive.calls) {
        yield meta =>
          applyMiddleware(callFn, middleware)({
            directive: {
              ...directive,
              call: () =>
                Promise.all(
                  directive.calls.map(asyncDirective =>
                    applyMiddleware(callFn, middleware)({ directive: asyncDirective, meta: { ...meta, step: index } })
                  )
                ),
            },
            meta: { ...meta, step: index },
          });
      } else {
        yield meta => applyMiddleware(callFn, middleware)({ directive, meta: { ...meta, step: index } });
      }
    } catch (error) {
      console.warn(error);
      return;
    }
  }
}
