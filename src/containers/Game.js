import React, { Component, PropTypes } from 'react'
import {updatePlayers,initiateGame} from '../actions'
import {playerService, gameService} from '../hanabi/gameServices'
import {gameStages} from "../hanabi/models"
import {Events} from '../actions'
import socket from '../socketStore'
import SingleInputWithButton from "../components/SingleInputWithButton"
import {Grid,Row,Col} from 'react-bootstrap'
import GamePlayView from '../hanabi/gameViews/GamePlayView'
import GamePrepareView from '../hanabi/gameViews/GamePrepareView'
import GameOverView from '../hanabi/gameViews/GameOverView'

export default class Game extends Component {

  render(){
    const {gameTable,players, user } = this.props;

    var playStage = (<div></div>);
    var waitStage = (<div></div>);
    var endStage = (<div></div>);
    var gameStage= null;

    switch(gameTable.stage){
      case gameStages.gamePrepare:
        gameStage = (<GamePrepareView {...this.props}
            onReadyClick={this.ready.bind(this)}
            onStartClick={this.start.bind(this)}/>);
        break;
      case gameStages.gameOn:
        gameStage = <GamePlayView {...this.props}></GamePlayView>
        break;
      case gameStages.gameOver:
        gameStage = <GameOverView {...this.props}></GameOverView>
        break;
    }
    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <h3>Game</h3>
            </Col>
          </Row>
          {gameStage}
        </Col>
      </Row>
    )
  }
  ready(){
    const { user ,room} = this.props;
    console.log("Ready");
    let player = {id:user.userId, displayName:user.name, status:0 , hand:[]};
    let userReadyQuery ={service:'player', action:'add', data:player}
    socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:userReadyQuery} );
    //TODO:for local test
    //playerService.addPlayer(player);
  }
  //start button handler, this is not related to game logic
  start(){
    const { user,room, gameTable,players}=this.props;
    let table=gameTable;
    table.cardDeck = gameService.createDeck();
    playerService.setActivePlayer(user.userId);
    var gameStartQuery={service:'game',action:'gameStart', data:{gameTable:table,players:players}};
    //send query;
    socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:gameStartQuery});
  }

}


