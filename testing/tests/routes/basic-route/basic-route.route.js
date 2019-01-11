export const basicRoute = () => {

  // Needs concept of History for unmapped back opperations.

  const rootFlow = new Map([
    ['profile', { // sload products list
      flow: loadProfilePage,
      actions: {
        save: saveProfile,
        back: historyBack
      } 
    }],
    // ['logOut', { // this doesn'y work - 
    //   flow: logOutUser,
    //   actions: {}
    // }],
    ['discover', { // load product
      flow: loadDiscoveryPage,
      actions: {
        next: 'secondPage',
        back: 'firstPage'
      }
    }]
  ]);

  return new Map([
    ['first', { // sload products list
      flow: firstSteps,
      actions: {
        next: 'firstPage',
        back: false 
      } 
    }],
    ['firstPage', { // show products list
      flow: firstSteps,
      actions: {
        next: 'loadProduct',
        back: false
      }
    }],
    ['load-product', { // load product
      flow: firstSteps,
      actions: {
        next: 'secondPage',
        back: 'firstPage' 
      }
    }]
  ]);
};