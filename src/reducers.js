import { combineReducers } from 'redux'
// import { GET_NEW_USER,ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
import  socket  from './socketStore'
import {Events} from './actions'

function user(state={},action){
  switch (action.type) {
    case "new_user":
      setTimeout(function() {socket.emit(Events.GET_NEW_USER, action.data); }, 1000);
      return state;
    case "on_user_update":
      console.log(action.data);
      return Object.assign({},state,action.data)

    default:

    return state
  }
}

const todoApp = combineReducers({
  user
})

export default todoApp
