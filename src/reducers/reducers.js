import { combineReducers } from 'redux'
import {Events,Actions} from '../actions'
import gameTable from './gameTable'

function user(state={},action){
  switch (action.type) {
    case Actions.on_user_update:
      console.log(action.data);
      return Object.assign({},state,action.data);

    default:

    return state
  }
}

function room(state={},action){
  switch (action.type) {
    case Actions.on_room_creation:
      var ret=Object.assign({},state,action.data);
      console.log("new room"+ret.roomId);
      return ret;
    case Actions.on_roomdata_update:
      let ret=Object.assign({},state,action.data);
      console.log(ret);
      return ret;
    default:
      return state;

  }
}

function players(state=[],action){
  switch (action.type) {
    case Actions.update_players:
    console.log("store update players")
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
});

export default godaba
