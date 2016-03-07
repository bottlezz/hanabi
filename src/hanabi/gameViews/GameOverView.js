import React, { Component, PropTypes } from 'react'
import {playerService, gameService} from '../gameServices'
import {gameStages} from "../models"
import {Events} from '../../actions'
import socket from '../../socketStore'
import SingleInputWithButton from "../../components/SingleInputWithButton"
import {Grid,Row,Col} from 'react-bootstrap'

export default class  GamePrepareView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {gameTable} = this.props;
        let score = 0;
        for(let i=0;i<gameTable.playedCards.length;i++){
            score +=gameTable.playedCards[i].number;
        }
        return (
        <Row>
            <Col xs={12}>
                <h4>Game Over</h4>
                <div>Your score : {score}</div>
            </Col>

        </Row>)
    }

}
