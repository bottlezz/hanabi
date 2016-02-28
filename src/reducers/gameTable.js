import  socket  from '../socketStore'
import {Actions} from '../actions'

export default function gameTable(state={},action){
  console.log(action.type);
  switch (action.type) {
    case Actions.init_game:
      var deck=createDeck();
      return Object.assign({},{cardDeck:deck, discardDeck:[], playedCards:[]});


      break;
    case Actions.remove_top:
      socket.emit(Events.UPDATE, action.data)
      return state;
      break;

      //draw card, and update updated player list
    default:
    return {};

  }
  function createDeck(){
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
      shuffleDeck(cardDeck);
    }

    return cardDeck;
  }
  function shuffleDeck(cardDeck){
    let length=cardDeck.length;
    for(let i=0;i<length;i++){
      let ran=Math.floor(Math.random()*length);
      //swap
      let t=cardDeck[i];
      cardDeck[i]=cardDeck[ran];
      cardDeck[ran] = t;
    }
  }
  function Card(color,number){
    return {color,number,hintColor:null,hintNumber:null}
  }

}
