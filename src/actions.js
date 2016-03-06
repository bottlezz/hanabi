/*
 * action types
 */
export const Events =  {
//pub
  UPDATE : "Update",
  BROADCAST : "Broadcast",
  GET_ROOM : "Get_Room",
  GET_NEW_USER : "New_User",
  GET_NEW_ROOM : "New_Room",
  //sub
  //room update will dispatch data to table or palyers.
  ON_ROOMDATA_UPDATE : "Room_Update",
  ON_USER_CREATION : "New_User",
  ON_USER_UPDATE:"User_Update",
  ON_NEW_ROOM : "New_Room",
  ON_ROOM_JOIN : "Get_Room"
};
export const Actions = {
  on_user_update : "on_user_update",
  on_room_creation: "on_room_creation",
  on_roomdata_update:"on_roomdata_update",
  on_room_join:"on_room_join",
  //game logic
  init_game:"init_game",
  remove_top:"remove_top",
  deal_cards:"deal_cards",
  //this 2 method will overwrite all data
  update_table:"update_table",
  update_players:"update_players"

};
/*
 * other constants
 */
/*
 * action creators
 */
export function onRoomDataUpdate(data){
  return {type:Actions.on_roomdata_update, data}
}
export function onUserDataUpdate(data){
  return { type: Actions.on_user_update, data }
}
export function initiateGame(){
  return { type: Actions.init_game}
}
export function dealCards(cards){
  return { type: Actions.deal_cards, cards}
}
export function removeTop(count){
  return { type: Actions.remove_top, count}
}
export function updateTable(data){
  return { type: Actions.update_table, data}
}
export function updatePlayers(data){
  return { type: Actions.update_players, data}
}
export function onRoomCreation(data){
  return { type: Actions.on_room_creation, data}
}
