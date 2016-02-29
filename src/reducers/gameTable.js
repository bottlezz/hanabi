import  socket  from '../socketStore'
import {Actions} from '../actions'
import {gameStages} from '../hanabi/models'

export default function gameTable(state={
  cardDeck:[],
  discardDeck:[],
  playedCards:[],
  stage:gameStages.gamePrepare
},action){
  console.log(action.type);
  switch (action.type) {
    //case Actions.init_game:
      //var deck=createDeck();
      //return Object.assign({},{cardDeck:deck, discardDeck:[], playedCards:[]});


     // break;
    case Actions.remove_top:
      socket.emit(Events.UPDATE, action.data)
      return state;
      break;
    case Actions.update_table:
      return Object.assign({},action.data)

      //draw card, and update updated player list
    default:
    return {};

  }
}
