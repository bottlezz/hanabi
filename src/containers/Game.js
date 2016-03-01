import React, { Component, PropTypes } from 'react'
import {updatePlayers,initiateGame} from '../actions'
import {playerService, gameService} from '../hanabi/gameServices'
import {gameStages} from "../hanabi/models"
import SingleInputWithButton from "../components/SingleInputWithButton"

export default class Game extends Component {

  render(){
    const {gameTable,players, user } = this.props;

    var playStage = (<div></div>);
    var waitStage = (<div></div>);
    var endStage = (<div></div>);
    var gameStage=(<div></div>);

    switch(gameTable.stage){
      case gameStages.gamePrepare:
        gameStage = (<GamePrepareView
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

    const { user } = this.props;
    console.log("Ready");

    var player = {id:user.userId, displayName:user.name, status:0 , hand:[]};
    var roomData={
      query:{service:'player', action:'add', data:player}
    };
    //TODO:for local test
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

    //TODO:for local test.
    gameService.startGame(table);
    playerService.setActivePlayer(user.userId);

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
    return ( <p>
      {this.state.isReady?
          (<button onClick={e=>this.handleStartClick(e)}>Start</button>):
          (<button onClick={e=>this.handleReadyClick(e)}>Ready</button>) }


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
    const { user, gameTable}=this.props;

    let playerOption = (<div></div>)
    if(playerService.getActivePlayer().id==user.userId){
      playerOption = (<PlayerOption onPlayClick={index=>this.play(index)}
      onDiscardClick={index=>this.discard(index)}/>)
    }
    let myself=playerService.getPlayer(user.userId);
    return (<div>
      <p>My card </p>

        <PlayerHand hand={myself.hand} />
      {playerOption}

    </div>)
  }
  play(index){
    const { user, gameTable}=this.props;
    let query = {service:'game', action:'playCard', data:{userId:user.userId, cardIndex:index} };

    //TODO:for local test
    console.log("play"+index)
    gameService.playerPlayCard(user.userId,index);

  }
  discard(index){
    const { user, gameTable}=this.props;

    let query = {service:'game', action:'playCard', data:{userId:user.userId, cardIndex:index} };
    console.log("discard")
    //TODO:for local test
    gameService.playerDiscardCard(user.userId,index);
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