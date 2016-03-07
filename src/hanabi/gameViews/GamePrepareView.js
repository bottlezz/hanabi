
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
    this.state = {isReady:false};

  }
  render(){
    const {user,room} = this.props;

    let isHost = (room.users[0]==user.userId);
    let readyButton = null;
    let startButton = null;
    if(!this.state.isReady)readyButton =(<button onClick={e=>this.handleReadyClick(e)}>Ready</button>);
    if(this.state.isReady && isHost) startButton =  (<button onClick={e=>this.handleStartClick(e)}>Start</button>);
    return ( <Row>
      <Col xs={12}>
        {readyButton}
        {startButton}
      </Col>

    </Row>)
  }
  handleReadyClick(e){
    this.setState({isReady:true});
    this.props.onReadyClick();
  }
  handleStartClick(e){
    this.props.onStartClick();
  }
}
