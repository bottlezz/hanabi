
/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const UPDATE = "Update"
export const GET_ROOM = "Get_Room"
export const GET_NEW_USER = "New_User"
export const GET_NEW_ROOM = "New_Room"
export const ON_ROOMDATA_UPDATE = "Room_Update"
export const ON_USER_UPDATE = "New_User"
export const ON_NEW_ROOM = "New_Room"

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}





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
  return { type: "new_user", data:{name}}
}
export function onUserDataUpdate(data){
  return { type: "on_user_update", data }
}
