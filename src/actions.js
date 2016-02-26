
/*
 * action types
 */


export const Events =  {
//pub
  UPDATE : "Update",
  GET_ROOM : "Get_Room",
  GET_NEW_USER : "New_User",
  GET_NEW_ROOM : "New_Room",
  //sub
  ON_ROOMDATA_UPDATE : "Room_Update",
  ON_USER_CREATION : "New_User",
  ON_USER_UPDATE:"User_Update",
  ON_NEW_ROOM : "New_Room",
  ON_ROOM_JOIN : "Get_Room"
}

export const Actions = {
  new_user: "new_user",
  on_user_update : "on_user_update",
  get_room : "get_room",
  on_room_creation: "on_room_creation",
  on_roomdata_update:"on_roomdata_update",
  on_room_join:"on_room_join"

}
/*
 * other constants
 */

/*
 * action creators
 */

export function getNewUserByName(name){
  return { type: Actions.new_user, data:{name}}
}
export function onUserDataUpdate(data){
  return { type: Actions.on_user_update, data }
}
export function getRoom(data){
  return { type: Actions.get_room, data}
}
export function onRoomCreation(data){
  return { type: Actions.on_room_creation, data}
}
export function onRoomDataUpdate(data){

}
export function onRoomJoin(data){

}
