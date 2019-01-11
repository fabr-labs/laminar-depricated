import { applyMiddleware } from "../utilities/apply-middleware.js";

import { transitionNotFoundError } from "./errors/transition-not-found-error.js";

export function createRouter({ middleware=[], sharedRoute={}, route={} }) {

  let currentRoute = route;
  let currentSharedRoute = sharedRoute;

  function updateActions() {
    actions = Object.assign({}, sharedRoute, route);
  }

  function next(route, directive) {

    // if (!route.actions[directive.transitionTo]) {
    //   throw transitionNotFoundError(`An action named ${ directive.action } is not currently listed!`);
    // }

    // const action = route.actions[directive.action];

  }

  // On each new step, create merged actions.. 

  return {
    mountRoute({ route }) {
      currentRoute = {
        
      };
      updateActions();
    },
    mountSharedRoute({ sharedRoute }) {
      currentSharedRoute = sharedRoute;
      updateActions();
    },
    next(directive) {
      applyMiddleware(next, middleware)(currentRoute, directive);
    },
    sharedNext(directive) {
      applyMiddleware(next, middleware)(currentSharedRoute, directive);
    }
  };
}

  // const unauthedRoot = {
  //   actions: {
  //     profile() {
  //     }
  //   }
  // };

  // const route = {
  //   openProfile: {
  //     onEntry: [],
  //     onExit: [],
  //     actions: {
  //       save: 'saveProfileFlow',
  //       cancel: 'historyBack'
  //     }
  //   },
  //   openDiscover: {
  //     actions: {
  //       openProduct: 'openProductFlow',
  //       back: 'historyBack'
  //     }
  //   },
  //   openGroups: {
  //     actions: {
  //       openGroup: 'openGroupFlow',
  //       back: 'historyBack'
  //     }
  //   },
  //   logIn: {
  //     flow: 'logIn'
  //   },
  // };

  // const router = {
  //   rootActions: {
  //     profile:  'openProfile',
  //     discover: 'openDiscover',
  //     groups:   'openGroups',
  //     logOut:   'logOut',
  //     resume:   'resumeFlow'
  //   },
  //   rootFlow: {
  //     openProfile: {
  //       actions: {
  //         save: saveProfileFlow,
  //         cancel: historyBack
  //       }
  //     },
  //     openDiscover: {
  //       actions: {
  //         openProduct: openProductFlow,
  //         back: historyBack
  //       }
  //     },
  //     openGroups: {
  //       actions: {
  //         openGroup: openGroupFlow,
  //         back: historyBack
  //       }
  //     },
  //     logIn: {
  //       flow: logIn
  //     },
  //     logOut: {
  //       flow: logOut
  //     }
  //   },
  //   actions: {

  //   }
  // };

  // const authedRoot = new Map([
  //   ['first', { // sload products list
  //     entryFlow: firstSteps,
  //     entryFn: firstSteps,
  //     actions: {
  //       next: 'firstPage',
  //       back: false 
  //     } 
  //   }],
  //   ['firstPage', { // show products list
  //     flow: firstSteps,
  //     actions: {
  //       next: 'loadProduct',
  //       back: false
  //     }
  //   }],
  //   ['load-product', { // load product
  //     flow: firstSteps,
  //     actions: {
  //       next: 'secondPage',
  //       back: 'firstPage' 
  //     }
  //   }]
  // ]);