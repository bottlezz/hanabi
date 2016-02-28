import  socket  from '../socketStore'

export default function gameTable(state={},action){
  switch (action.type) {
    case action.init_game:
      var deck=createDeck();
      return Object.assign({},{cardDeck:deck, discardDeck:[], playedCards:[]});

      break;
    case action.remove_top:
      socket.emit(Events.UPDATE, action.data)
      return state;
      break;

      //draw card, and update updated player list
    default:
    return {};

  }
  function createDeck(){
    cardDeck = [];
    for(let i=1;i<6;i++){
      cardDeck.push(new Card("red",i));
      cardDeck.push(new Card("yellow",i));
      cardDeck.push(new Card("white",i));
      cardDeck.push(new Card("green",i));
      cardDeck.push(new Card("blue",i));
    }
    for(let i=1;i<5;i++){
      cardDeck.push(new Card("red",i));
      cardDeck.push(new Card("yellow",i));
      cardDeck.push(new Card("white",i));
      cardDeck.push(new Card("green",i));
      cardDeck.push(new Card("blue",i));
    }
    for(let i=1;i<2;i++){
      cardDeck.push(new Card("red",i));
      cardDeck.push(new Card("yellow",i));
      cardDeck.push(new Card("white",i));
      cardDeck.push(new Card("green",i));
      cardDeck.push(new Card("blue",i));
    }
    for(let i=1;i<15;i++){
      shuffleDeck(cardDeck);
    }

    return cardDeck;
  }
  function shuffleDeck(deck){
    let length=cardDeck.length;
    for(let i=0;i<length;i++){
      let ran=Math.floor(Math.random()*length);
      //swap
      let t=cardDeck[i];
      cardDeck[i]=this.cardDeck[ran];
      cardDeck[ran] = t;
    }
  }
}
