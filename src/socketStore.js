import io from 'socket.io-client'
import {Events} from './actions'
import {onUserDataUpdate,onRoomCreation,onRoomDataUpdate} from './actions'
import store from "./reduxStore"
import {socketServerUrl} from './socketServerUrl'
import {playerService, gameService} from './hanabi/gameServices'


const socket=io(socketServerUrl);

console.log(socketServerUrl);
socket.on('test',function(data){console.log(data)});
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
  store.dispatch(onRoomDataUpdate(data))
  //update game
  //update players
});
socket.on(Events.BROADCAST, function(data){
 // console.log(data);
  let query=data;
  if(query && query.service=='player'){

    switch (query.action) {
      case 'add':

          console.log(query.data)
        playerService.addPlayer(query.data);
        break;
      default:
    }
  }
  if(query && query.service == 'game'){
    console.log(query.action)
    console.log(query.data);

    switch (query.action) {
      case 'gameStart':
          //TODO: make sure this two action are in order.
        playerService.updateAll(query.data.players);

        gameService.startGame(query.data.gameTable);
        break;
      case 'playerDiscardCard':
        gameService.playerDiscardCard(query.data.userId,query.data.cardIndex);
        break;
      case 'playerPlayCard':
        gameService.playerPlayCard(query.data.userId,query.data.cardIndex);
            break;
      case 'gameOver':
        gameService.gameOver();

        break;
      default:

    }
  }

})

export default socket;
