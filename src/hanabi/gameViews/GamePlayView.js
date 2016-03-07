import React, { Component, PropTypes } from 'react'
import {playerService, gameService} from '../gameServices'
import {gameStages} from "../models"
import {Events} from '../../actions'
import socket from '../../socketStore'
import SingleInputWithButton from "../../components/SingleInputWithButton"
import {Grid,Row,Col} from 'react-bootstrap'

export default class GamePlayView extends Component{
    render(){
        const { user, gameTable,players,room}=this.props;
        let playerOption = (<div></div>)
        if(playerService.getActivePlayer().id==user.userId){
            if(gameTable.life <= 0 ){
                //game over
                var gameOverQuery={service:'game',action:'gameOver'};
                socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:gameOverQuery});

            }
            playerOption = (<PlayerOption onPlayClick={index=>this.play(index-1)}
                                          onDiscardClick={index=>this.discard(index-1)}/>)
        }
        let myself=playerService.getPlayer(user.userId);
        if(myself==null)return (<div>game is in progress</div>);

        var renderPlayers = function(p, index){
            if(p.id!=user.userId) return (<PlayerHand hand={p.hand} key={index} />)
            return;
        };


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
        let query = {service:'game', action:'playerPlayCard', data:{userId:user.userId, cardIndex:index} };
        socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:query});
    }
    discard(index){
        const { user, room }=this.props;
        let query = {service:'game', action:'playerDiscardCard', data:{userId:user.userId, cardIndex:index} };
        socket.emit(Events.BROADCAST, {roomId:room.roomId, userId:user.userId, data:query});
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