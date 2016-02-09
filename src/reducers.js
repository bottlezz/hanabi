import { combineReducers } from 'redux'
import  socket  from './socketStore'
import {Events,Actions} from './actions'


function user(state={},action){
  switch (action.type) {
    case "new_user":
      //setTimeout(function() {socket.emit(Events.GET_NEW_USER, action.data); }, 1000);
      socket.emit(Events.GET_NEW_USER, action.data);
      return state;
    case "on_user_update":
      console.log(action.data);
      return Object.assign({},state,action.data)

    default:

    return state
  }
}

function room(state={},action){
  switch (action.type) {
    case Actions.get_room:
      socket.emit(Events.GET_ROOM , action.data)
      return state
    case Actions.on_room_creation:
      console.log(action.data);
      return Object.assign({},state,action.data);

    default:
      return state;

  }
}

const todoApp = combineReducers({
  user,
  room
})

export default todoApp
