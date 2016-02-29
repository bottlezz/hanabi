import React, { Component, PropTypes } from 'react'
import {updatePlayers,initiateGame} from '../actions'
import {playerService, gameService} from '../hanabi/gameServices'
import {gameStages} from "../hanabi/models"

export default class Game extends Component {

  render(){
    const {gameTable,players } = this.props;
    var preStage = (<div>
      <button onClick={this.ready.bind(this)}>Ready</button>
      <button onClick={this.start.bind(this)}>Start</button>
    </div>);
    var playStage = (<div></div>);
    var waitStage = (<div></div>);
    var endStage = (<div></div>);
    var gameStage=(<div></div>);
    if(gameTable.stage == gameStages.gamePrepare) currentStage = preStage;
    switch(gameTable.stage){
      case gameStages.gamePrepare:
        gameStage = (<gamePrepareView />);
        break;
      //case gameStages.gameOn
    }
    return (
      <div>
        <h3>Game</h3>
        <span>remaining:{gameTable.cardDeck?gameTable.cardDeck.length:'N/A'}</span>
        {gameStage}

      </div>
    )
  }
  ready(){

    const { user } = this.props;
    console.log("Ready");

    var player = {id:user.userId, displayName:user.name, status:0 , hand:[]};
    var roomData={
      query:{service:'player', action:'add', data:player}
    };
    playerService.addPlayer(player);
  }
  //start button handler, this is not realted to game logic
  start(){
    const { user, gameTable}=this.props;
    //emit deck;
    //deal cards for each player
    let table=gameTable;
    table.cardDeck = gameService.createDeck();
    console.log(gameTable);

    var gameStartQuery={service:'game',action:'gameStart', table};
    //send query;
    var setUserQuery = {service:'player', action:'setActivePlayer', id:user.userId}
    //for local test.
    gameService.startGame(table);
    playerService.setActivePlayer(user.userId);



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
class gamePrepareView extends Component{
  getInitialState(){
    return {isReady:false}
  }
  render(){
    return ( <p>
      {this.state.isReady?
          (<button onClick={e=>handleStartClick(e)}>Start</button>):
          (<button onClick={e=>handleReadyClick(e)}>Ready</button>) }


    </p>)
  }
  handleReadyClick(e){
    this.setState({isReady:true});
    this.props.onReadyClick();
  }
  handleStartClick(e){
    this.props.onStartClick();
  }
}