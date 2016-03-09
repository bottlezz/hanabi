import React, { Component, PropTypes } from 'react'
import {playerService, gameService} from '../gameServices'
import {gameStages} from "../models"
import {Events} from '../../actions'
import socket from '../../socketStore'
import SingleInputWithButton from "../../components/SingleInputWithButton"
import {Grid,Row,Col} from 'react-bootstrap'
import PlayerHandView from './PlayerHandView'

export default class GamePlayView extends Component{
    render(){
        const { user, gameTable,players,room}=this.props;
        //let playerOption = (<div></div>)
        let myself=playerService.getPlayer(user.userId);
        if(myself==null)return (<div>game is in progress</div>);
        let isMyTurn =(playerService.getActivePlayer().id==myself.id);
        if(isMyTurn){ 
            if(gameTable.life <= 0 || myself.status == 3){
                //game over
                console.log(gameTable);
                console.log(myself);
                var gameOverQuery={service:'game',action:'gameOver'};
                socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:gameOverQuery});
            }
        }
        let message = (<p>now is {playerService.getActivePlayer().displayName} turn</p>)


        var renderOtherPlayers = function(p){
            if(p.id!=user.userId) return (<PlayerHandView active={isMyTurn}
                hand={p.hand} hint={this.hint.bind(this)}
                key={p.id} userId={p.id} canHint={gameTable.hint>0}/>)
            return;
        };

        return (
            <Row>
                <Col xs={12}>
                    {message}
                    <Row><Col xs={12}>
                        <h4>My card </h4>
                        <PlayerHandView hand={myself.hand} isSelf={true} active={isMyTurn} play={ idx => this.play(idx)} discard={idx => this.discard(idx)}/>
                    </Col></Row>
                    <Row><Col xs={12}>
                        <h4>Others</h4>
                        {players.map(renderOtherPlayers.bind(this))}
                    </Col></Row>
                    <Row><Col xs={12}>
                        <h4>Table</h4>
                        <TableView {...this.props}/>
                        <DiscardView {...this.props}/>
                    </Col></Row>

                </Col>

            </Row>)
    }
    play(index){
        const { user, room}=this.props;
        let query = {service:'game', action:'playerPlayCard', data:{userId:user.userId, cardIndex:index} };
        socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:query});
    }
    discard(index){
        const { user, room }=this.props;
        let query = {service:'game', action:'playerDiscardCard', data:{userId:user.userId, cardIndex:index} };
        socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:query});
    }
    hint(userId, hintVal){
        // can resolve both number and color
        const { user, room}=this.props;
        let query = {service:'game', action:'playerHint', data:{userId, hintVal}};
        console.log('hint');
        socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:query});

    }

}
class TableView extends Component {
    //played item, and discards.

    render(){
        const{gameTable}=this.props
        var renderCard = function(item){
            if(item == null)return;
            return <Col xs={2}><div>{item.number}</div><div>{item.color}</div></Col>
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

class DiscardView extends Component {
    constructor(props){
        super(props);
        this.state = {display:false};
    }
    render(){

        const {gameTable } = this.props;
        var colorPick = function(color,cards){
            if(!cards)return null
            let a=[];
            for(let i=0;i<cards.length;i++){
                if(cards[i].color==color)a.push(cards[i].number+'-');
            }
            return a;
        }
        let discards = (<Row><Col xs={12}>
            <p>blue: {colorPick("blue",gameTable.discardDeck)}</p>
            <p>white: {colorPick("white",gameTable.discardDeck)}</p>
            <p>red: {colorPick("red",gameTable.discardDeck)}</p>
            <p>yellow: {colorPick("yellow",gameTable.discardDeck)}</p>
            <p>green: {colorPick("green",gameTable.discardDeck)}</p>

        </Col></Row>);
        return (<Row><Col xs={12}>
            <button onClick={e=>this.handleClick(e)}>discards</button>
            {this.state.display?discards:null}
        </Col></Row>);
    }
    handleClick(e){
        if(this.state.display){
            this.setState({display:false})
        }else{
            this.setState({display:true})
        }
    }
}
