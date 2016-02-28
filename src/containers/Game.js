import React, { Component, PropTypes } from 'react'
import {Hand, Card, GameData} from './models'
export default class Game extends Component {
  render(){
    const { dispatch,user,room,gameTable,players } = this.props
    return (
      <div>
        <span>remaining:{gameTable.cardDeck.length}</span>
        <span></span>
        <p>
          <button onClick={ready()}>Ready</button>
          <button onClick={start()}>Start</button>
        </p>
      </div>
    )
  }
  ready(){
     console.log("Ready");
  }
  start(){
    console.log("start");
  }
  addPlayer(player){
    //actually, this should be called in socket store.
    players.add(player);
  }

  discard(card){
    cosnole.log("discard")
  }
  play(card){
    console.log("play");
  }
  hint(userid,[cardIndx],hintType(number or color)){
    console.log("hint");
  }

  next(){
    console.log("next");
  }

  draw(){
    console.log("draw");
    //return this.cardDeck.pop();
  }
}
