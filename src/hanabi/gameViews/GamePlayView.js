import React, { Component, PropTypes } from 'react'
import {playerService, gameService} from '../gameServices'
import {gameStages} from "../models"
import {Events} from '../../actions'
import socket from '../../socketStore'
import SingleInputWithButton from "../../components/SingleInputWithButton"
import {Grid,Row,Col,Panel,ListGroup,ListGroupItem} from 'react-bootstrap'
import PlayerHandView from './PlayerHandView'

export default class GamePlayView extends Component{
    render(){
        const { user, gameTable,players,room}=this.props;
        //let playerOption = (<div></div>)
        let myself=playerService.getPlayer(user.userId);
        if(myself==null)return (<div>game is in progress</div>);
        let currentPlayer=playerService.getActivePlayer()
        let isMyTurn =(currentPlayer.id==myself.id);
        if(isMyTurn){ 
            if(gameTable.life <= 0 || myself.status == 3){
                //game over
                console.log(gameTable);
                console.log(myself);
                var gameOverQuery={service:'game',action:'gameOver'};
                socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:gameOverQuery});
            }
        }
        let message = (<p>{gameTable.gameMessage} Now is {playerService.getActivePlayer().displayName+"'s"} turn</p>)


        let otherPlayers = []
        let myIndex = players.indexOf(myself);
        for(let i=1;i<players.length;i++){
            let p=players[(myIndex+i)%players.length];
            let entry = (<PlayerHandView active={isMyTurn}
                hand={p.hand} hint={this.hint.bind(this)}
                userId={p.id} name={p.displayName}
                isCurrent = {p.id==currentPlayer.id}
                canHint={gameTable.hint>0}/>);
            otherPlayers.push(entry);
        };

        return (
            <Row>
                <Col xs={12}>
                    {message}
                    <Row><Col xs={12}>
                        <PlayerHandView hand={myself.hand}
                                        name={myself.displayName}
                                        isSelf={true}
                                        active={isMyTurn}
                                        isCurrent = {myself.id==currentPlayer.id}
                                        play={ idx => this.play(idx)}
                                        discard={idx => this.discard(idx)}/>

                        <Row><Col xs={12}><hr></hr></Col></Row>
                        {otherPlayers}
                    </Col></Row>
                    <Row><Col xs={12}>
                        <h4>Table<small>{' (Hint: '+gameTable.hint
                        +',life:'+gameTable.life
                        +', cards: '+gameTable.cardDeck.length
                        +')'}</small></h4>
                        <TableView {...this.props}/>
                        <hr/>
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
                {gameTable.playedCards.map(renderCard)}
            </Row>
        )

    }
}

class DiscardView extends Component {
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
        let discards = (
            <Panel collapsible header="Discard">
                <p>blue: {colorPick("blue",gameTable.discardDeck)}</p>
                <p>white: {colorPick("white",gameTable.discardDeck)}</p>
                <p>red: {colorPick("red",gameTable.discardDeck)}</p>
                <p>yellow: {colorPick("yellow",gameTable.discardDeck)}</p>
                <p>green: {colorPick("green",gameTable.discardDeck)}</p>
            </Panel>

        );
        return (<Row><Col xs={12}>
            {discards}
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
