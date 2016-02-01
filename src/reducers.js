import { combineReducers } from 'redux'

//import  socket  from './socketStore'
function user(state={},action){
  switch (action.type) {
    case "new_user":
  //    setTimeout(function() {socket.emit("New_User", action.data); }, 1000);
      return state

    case "on_user_update":
      console.log(action.data)
      return Object.assign({},state,action.data)


    default:

    return state
}

const todoApp = combineReducers({
  user
})
export default todoApp
