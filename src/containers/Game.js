import React, { Component, PropTypes } from 'react'
import {Hand, Card, GameData} from './models'
export default class Game extends Component {
  render(){
    const { dispatch,user,room,gameTable,players } = this.props
    return (
      <div>
        <span>remaining:{gameTable.cardDeck.length}</span>
        <span></span>
      </div>
    )
  }
  ready(){

  }
  start(){

  }


  addPlayer(player){
    //actually, this should be called in socket store.
    players.add(player);
  }
  draw(){
    return this.cardDeck.pop();
  }
  discard(card){
    update hand
    emit...
  }
  play(card){
    update hand
    calculate {Table} see if it needs to be update.
    emit...
  }
  hint(userid,[cardIndx],hintType(number or color)){
    emit...
  }
  next(){
    get next player.
    emit...
  }
}
