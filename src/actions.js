
/*
 * action types
 */


export const Events =  {

  UPDATE : "Update",
  GET_ROOM : "Get_Room",
  GET_NEW_USER : "New_User",
  GET_NEW_ROOM : "New_Room",
  ON_ROOMDATA_UPDATE : "Room_Update",
  ON_USER_UPDATE : "New_User",
  ON_NEW_ROOM : "New_Room",
}

export const Actions = {
  new_user: "new_user",
  on_user_update : "on_user_update"
}
/*
 * other constants
 */






/*
 * action creators
 */

// export function addTodo(text) {
//   return { type: ADD_TODO, text }
// }
//
// export function completeTodo(index) {
//   return { type: COMPLETE_TODO, index }
// }
//
// export function setVisibilityFilter(filter) {
//   return { type: SET_VISIBILITY_FILTER, filter }
// }
//
// export function update(data){
//   return { type: UPDATE, data}
// }
// export function getRoom(roomId,userid){
//   return { type: GET_ROOM, data:{roomId,userId}}
// }
export function getNewUserByName(name){
  return { type: Actions.new_user, data:{name}}
}
export function onUserDataUpdate(data){
  return { type: Actions.on_user_update, data }
}
