import { combineReducers } from 'redux'
import  socket  from './socketStore'
import {Events,Actions} from './actions'
import {Hand, Card, GameData} from './hanabi/models'
import gameTable from './reducers/gameTable'

function user(state={},action){
  switch (action.type) {
    case "new_user":
      //setTimeout(function() {socket.emit(Events.GET_NEW_USER, action.data); }, 1000);
      socket.emit(Events.GET_NEW_USER, action.data);
      return state;
    case "on_user_update":
      console.log(action.data);
      return Object.assign({},state,action.data)

    default:

    return state
  }
}

function room(state={},action){
  switch (action.type) {
    case Actions.get_room:
      socket.emit(Events.GET_ROOM , action.data)
      console.log(action.data)
      return state
    case Actions.on_room_creation:

      var ret=Object.assign({},state,action.data);
      console.log(ret);
      return ret

    default:
      return state;

  }
}

function players(state=[],action){
  switch (action.type) {
    case Actions.update_players:
      return Object.assign([],action.data);

      break;
    case Actions.deal_cards:
      return [];
    default:
    return state;
  }

}

const godaba = combineReducers({
  user,
  room,
  gameTable,
  players
})

export default godaba
