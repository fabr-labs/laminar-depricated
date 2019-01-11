
const init = {};

export function testReducer(state = init, action) {

  switch (action.type) {
    case 'SET_DATA':
      return Object.assign({}, action.data);

    case 'UPDATE_DATA':
      return Object.assign({}, state, action.data);
  
    default:
      return state;
  }
}