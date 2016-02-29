import store from '../reduxStore'
import {updatePlayers,initiateGame} from '../actions'

export const ServiceCall = {
  game_start: 'start'
};

export class PlayerService{
  constructor(){
    this.store = store
  }
  add(player){
    let players = store.players;
    for(let i=0; i< players.length; i++){
      if(players[i].id== player.id){
        return
      }
    }
    players.push(player);
    store.dispatch(updatePlayers(players))
  }
}
export class GameService{
  constructor(){
    this.store = store;
  }
  startGame(data){
    //store.dispatch()
  }
}
