
const init = []

return function todos(state = init, action) {

  switch (action.type) {
    case 'UPDATE_TODOS':
      return [...action.todos];
  
    default:
      return state;
  }
}