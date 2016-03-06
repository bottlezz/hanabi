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
    var gameStage=(<div></div>);

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
      <div>
        <h3>Game</h3>
        <span>remaining:{gameTable.cardDeck?gameTable.cardDeck.length:'N/A'}</span>
        {gameStage}

      </div>
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
  next(){
    console.log("next");
  }
  draw(){
    console.log("draw");
    //return this.cardDeck.pop();
  }
}
class GamePrepareView extends Component{
  constructor(props){
    super(props);
    this.state = {isReady:false};

  }
  render(){
    const {user,room} = this.props;

    let isHost = (room.users[0]==user.userId);
    let readyButton = null;
    let startButton = null;
    console.log("hello");
    if(!this.state.isReady)readyButton =(<button onClick={e=>this.handleReadyClick(e)}>Ready</button>);
    if(this.state.isReady && isHost) startButton =  (<button onClick={e=>this.handleStartClick(e)}>Start</button>);
    return ( <p>
      {readyButton}
      {startButton}


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

    var renderPlayers = function(p){
      if(p.id!=user.userId) return (<PlayerHand hand={p.hand} />)
      return;
    }

    return (<div>
      <p>My card </p>

        <PlayerHand hand={myself.hand} />
      <p>Others</p>
        {players.map(renderPlayers)}
      <p>Table</p>
      <TableView {...this.props}/>
      {playerOption}


    </div>)
  }
  play(index){
    const { user, room}=this.props;
    let query = {service:'game', action:'playerPlayCard', data:{userId:user.userId, cardIndex:index} };
    socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:query});

    //TODO:for local test
   // console.log("play"+index)
    //gameService.playerPlayCard(user.userId,index);

  }
  discard(index){
    const { user, room }=this.props;

    let query = {service:'game', action:'playerDiscardCard', data:{userId:user.userId, cardIndex:index} };
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
    var renderCard = function(item,index){
      if(item == null)return
      return <li key={index}>{item.number},{item.color}</li>
    }
    return(
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
    )

  }
}
class PlayerHand extends Component {
  render(){
    var renderCard = function(item,index){
      if(item == null)return <li>N/A</li>
      return <li key={index}>{item.number},{item.color}</li>
    }
    return <ul>{this.props.hand.map(renderCard)}</ul>
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