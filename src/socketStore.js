import io from 'socket.io-client'
import {Events} from './actions'
import {onUserDataUpdate,onRoomCreation} from './actions'
import store from "./reduxStore"
import {socketServerUrl} from './socketServerUrl'
import {playerService, gameService} from './hanabi/gameServices'


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
  console.log(data);
  let query=data;
  if(query && query.service=='player'){

    switch (query.action) {
      case 'add':

          console.log(query.data)
        playerService.addPlayer(query.data);
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
        gameService.startGame(query.data);


        break;
      default:

    }
  }

})

export default socket;
