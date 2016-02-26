import React, { Component, PropTypes } from 'react'
import {Hand, Card, GameData} from './models'
export default class Game extends Component {
  render(){

  }
  ready(){

  }
  start(){
    
  }
  shuffleDeck(){
    let length=this.data.cardDeck.length;
    for(let i=0;i<length;i++){
      let ran=Math.floor(Math.random()*length);
      //swap
      let t=this.data.cardDeck[i];
      this.data.cardDeck[i]=this.cardDeck[ran];
      this.data.cardDeck[ran] = t;
    }
  }

  addPlayer(player){
    this.players.push(player);
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
