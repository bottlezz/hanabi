import React, { Component, PropTypes } from 'react'
import {updatePlayers,initiateGame} from '../actions'
export default class Game extends Component {
  render(){
    const {gameTable,players } = this.props
    return (
      <div>
        <h3>Game</h3>
        <span>remaining:{gameTable.cardDeck?gameTable.cardDeck.length:'N/A'}</span>
        <span></span>
        <p>
          <button onClick={this.ready.bind(this)}>Ready</button>
          <button onClick={this.start.bind(this)}>Start</button>
        </p>
      </div>
    )
  }
  ready(){
    console.log(this);
     const { dispatch,user,room,gameTable,players } = this.props
     console.log("Ready");
     var player = {id:user.userId, displayName:user.name, status:0 , hand:[]}
     var roomData={
       query:{service:'player', action:'add', data:player}
     }

     ///for local test
     let query=roomData.query;
     if(query && query.service=='player'){
       //get state
       let data=players;
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

  }
  start(){
    const { dispatch,user,room,gameTable,players } = this.props
    console.log(this.props.gameTable);
    //console.log("start");
    dispatch(initiateGame());
    console.log(this.props.gameTable);
    //emit deck;
    //deal cards for each player

    let numOfPlayers = players.length
    let cardLimit =3
    if( numOfPlayers > 3)cardLimit =4

    for(let i =0;i< numOfPlayers; i++){
       for(let j=0;j< cardLimit;j++){

       }
    }
    var query={service:'game',action:'overwrite', gameTable};
    console.log(this.props.gameTable);
  }
  // addPlayer(player){
  //   //actually, this should be called in socket store.
  //   //players.add(player);
  // }
  discard(card){
    console.log("discard")
  }
  play(card){
    console.log("play");
  }
  // hint(userid,[cardIndx],hintType(number or color)){
  //   console.log("hint");
  // }
  next(){
    console.log("next");
  }
  draw(){
    console.log("draw");
    //return this.cardDeck.pop();
  }
}
