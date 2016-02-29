import store from '../reduxStore'
import {updatePlayers,initiateGame,updateTable} from '../actions'

export const ServiceCall = {
  game_start: 'start'
};

class PlayerService{
  constructor(){

  }
  addPlayer(player){
    let players = store.getState().players;
    for(let i=0; i< players.length; i++){
      if(players[i].id== player.id){
        return
      }
    }
    players.push(player);
    store.dispatch(updatePlayers(players))
  }
  setActivePlayer(id){
    let players = store.getState().players;
    for(let i=0; i< players.length; i++){
      if(players[i].id== id){
        players[i].status=1;
      }else{
        players[i].status=0;
      }
    }
  }
  getActivePlayer(){
    let players = store.getState().players;
    for(let i=0; i< players.length; i++){
      if(players[i].status== 1){
        return players[i]
      }
    }
  }
}
class GameService{
  constructor(){

  }
  startGame(data){
    let table=data;
    let players=store.getState().players;

    let numOfPlayers = players.length;
    let cardLimit =3;
    if( numOfPlayers > 3)cardLimit =4;

    for(let i =0;i< numOfPlayers; i++){
      players[i].hand=[];
      for(let j=0;j< cardLimit;j++){
        let index=i*cardLimit+j;
        players[i].hand.push(table[index]);
      }
    }
    table.cardDeck.splice(0,numOfPlayers*cardLimit);
    store.dispatch(updatePlayers((players)));
    store.dispatch(updateTable(table));

  }
  createDeck(){
    let cardDeck = [];
    for(let i=1;i<6;i++){
      cardDeck.push( Card("red",i));
      cardDeck.push( Card("yellow",i));
      cardDeck.push( Card("white",i));
      cardDeck.push( Card("green",i));
      cardDeck.push( Card("blue",i));
    }
    for(let i=1;i<5;i++){
      cardDeck.push( Card("red",i));
      cardDeck.push( Card("yellow",i));
      cardDeck.push( Card("white",i));
      cardDeck.push( Card("green",i));
      cardDeck.push( Card("blue",i));
    }
    for(let i=1;i<2;i++){
      cardDeck.push( Card("red",i));
      cardDeck.push( Card("yellow",i));
      cardDeck.push( Card("white",i));
      cardDeck.push( Card("green",i));
      cardDeck.push( Card("blue",i));
    }
    for(let i=1;i<15;i++){
      this.shuffleDeck(cardDeck);
    }

    return cardDeck;
  }
  shuffleDeck(cardDeck){
    let length=cardDeck.length;
    for(let i=0;i<length;i++){
      let ran=Math.floor(Math.random()*length);
      //swap
      let t=cardDeck[i];
      cardDeck[i]=cardDeck[ran];
      cardDeck[ran] = t;
    }
  }
}
function Card(color,number){
  return {color,number,hintColor:null,hintNumber:null}
}
export const playerService = new PlayerService();
export const gameService = new GameService();