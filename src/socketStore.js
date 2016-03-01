import io from 'socket.io-client'
import {Events} from './actions'
import {onUserDataUpdate,onRoomCreation} from './actions'
import store from "./reduxStore"
import {socketServerUrl} from './socketServerUrl'
const socket=io(socketServerUrl);

console.log(socketServerUrl);
socket.on('test',function(data){console.log(data)});
//socket.on("New_User",function(data){console.log(data)});

/*
 *
 */

socket.on(Events.ON_USER_CREATION, function(data){
  console.log(data);
  store.dispatch(onUserDataUpdate(data));
});
socket.on(Events.GET_ROOM,function(data){
  console.log(data);
  store.dispatch(onRoomCreation(data))
});
socket.on(Events.ON_ROOMDATA_UPDATE, function(data){
  //update Room
  //update game
  //update players
});
socket.on(Events.BROADCAST, function(data){
  let query=data.query;
  if(query && query.service=='player'){
    //get state
    let data=store.players;
    //update state
    switch (query.action) {
      case 'add':
        for(let i=0; i< data.length; i++){
          if(data[i].id== query.data.id){
            return;
          }
        }
        data.push(roomData.query.data)
        break;
      default:

    }
    //save update
    dispatch(updatePlayers(data));
  }
  if(query && query.service == 'game'){
    let data=store.game
    let palyers = store.players
    switch (query.action) {
      case 'start':


        break;
      default:

    }
  }

})

export default socket;
