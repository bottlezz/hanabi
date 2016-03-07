import React, { Component, PropTypes } from 'react'
import {updatePlayers,initiateGame} from '../actions'
import {playerService, gameService} from '../hanabi/gameServices'
import {gameStages} from "../hanabi/models"
import {Events} from '../actions'
import socket from '../socketStore'
import SingleInputWithButton from "../components/SingleInputWithButton"
import {Grid,Row,Col} from 'react-bootstrap'
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
      //case gameStages.gameOn
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
  //start button handler, this is not realted to game logic
  start(){
    const { user,room, gameTable,players}=this.props;
    //emit deck;
    //deal cards for each player
    let table=gameTable;
    table.cardDeck = gameService.createDeck();
    console.log(gameTable);
    playerService.setActivePlayer(user.userId);

    var gameStartQuery={service:'game',action:'gameStart', data:{gameTable:table,players:players}};
    //send query;

    socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:gameStartQuery});
    //socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:setActiveUserQuery});

    //TODO:for local test.
    //gameService.startGame(table);
    //playerService.setActivePlayer(user.userId);

  }

  // hint(userid,[cardIndx],hintType(number or color)){
  //   console.log("hint");
  // }
}

class GamePlayView extends Component{
  render(){

    const { user, gameTable,players}=this.props;

    let playerOption = (<div></div>)
    if(playerService.getActivePlayer().id==user.userId){
      playerOption = (<PlayerOption onPlayClick={index=>this.play(index)}
      onDiscardClick={index=>this.discard(index)}/>)
    }
    let myself=playerService.getPlayer(user.userId);
    if(myself==null)return (<div>game is in progress</div>);

    var renderPlayers = function(p, index){
      if(p.id!=user.userId) return (<PlayerHand hand={p.hand} key={index} />)
      return;
    }

    return (
      <Row>
      <Col xs={12}>
        <Row><Col xs={12}>
        <h4>My card </h4>
        <PlayerHand hand={myself.hand} />
        </Col></Row>
        <Row><Col xs={12}>
          <h4>Others</h4>
          {players.map(renderPlayers)}
        </Col></Row>
        <Row><Col xs={12}>
          <h4>Table</h4>
          <TableView {...this.props}/>
        </Col></Row>
      {playerOption}
</Col>

    </Row>)
  }
  play(index){
    const { user, room}=this.props;
    let query = {service:'game', action:'playerPlayCard', data:{userId:user.userId, cardIndex:index-1} };
    socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:query});

    //TODO:for local test
   // console.log("play"+index)
    //gameService.playerPlayCard(user.userId,index);

  }
  discard(index){
    const { user, room }=this.props;

    let query = {service:'game', action:'playerDiscardCard', data:{userId:user.userId, cardIndex:index-1} };
    console.log("discard");
    socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:query});
    //TODO:for local test
    //gameService.playerDiscardCard(user.userId,index);
  }

}
class TableView extends Component {
  //played item, and discards.

  render(){
    const{gameTable}=this.props
    var renderCard = function(item){
      if(item == null)return;
      return <Col xs={12}><div>{item.number}</div><div>{item.color}</div></Col>
    };
    return(
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={3}>
                <div>Card Remains</div>
                <div>{gameTable.cardDeck.length}</div>

              </Col>
              <Col xs={3}>
                <div>Hint Point</div>
                <div>{gameTable.hint}</div>

              </Col>
              <Col xs={3}>
                <div>Life Point</div>
                <div>{gameTable.life}</div>
              </Col>
            </Row>
            <Row>
              {gameTable.playedCards.map(renderCard)}
            </Row>
          </Col>
        </Row>
    )

  }
}
class PlayerHand extends Component {
  render(){
    var renderCard = function(item,index){
      if(item == null)return <li>N/A</li>
      return (<Col xs={2} key={index}><div>{item.number}</div><div>{item.color}</div></Col>)
    }
    return <Row>{this.props.hand.map(renderCard)}</Row>
  }
}
class PlayerOption extends Component{
  render(){
    return (<div>
      <SingleInputWithButton onButtonClick={this.props.onPlayClick} meta={ {label: 'play index',submit:'play'}}></SingleInputWithButton>
      <SingleInputWithButton onButtonClick={this.props.onDiscardClick} meta={ {label: 'discard index',submit:'discard'}}></SingleInputWithButton>

      <button>Hint</button>
    </div>)
  }
}