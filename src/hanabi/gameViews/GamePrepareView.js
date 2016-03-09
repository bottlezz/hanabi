
import React, { Component, PropTypes } from 'react'
import {playerService, gameService} from '../gameServices'
import {gameStages} from "../models"
import {Events} from '../../actions'
import socket from '../../socketStore'
import SingleInputWithButton from "../../components/SingleInputWithButton"
import {Grid,Row,Col,Button,Panel} from 'react-bootstrap'
export default class  GamePrepareView extends Component{
  constructor(props){
    super(props);
    this.state = {isReady:false};

  }
  render(){
    const {user,room,players} = this.props;

    let isHost = (room.users[0]==user.userId);
    let readyButton = null;
    let startButton = null;
    if(!this.state.isReady)readyButton =(<Button onClick={e=>this.handleReadyClick(e)}>Ready</Button>);
    if(this.state.isReady && isHost) startButton =  (<Button onClick={e=>this.handleStartClick(e)}>Start</Button>);
    let renderName=function(player){
      return <p key={player.id}>{player.displayName + " - Ready "}</p>
    }
    return ( <Row>
      <Col xs={12}>
        <Row><Col xs={8}>
          <Panel header={"Player joins"}>
            {players.map(renderName)}
          </Panel>

        </Col></Row>
        <Row><Col xs={8}>
          {readyButton}
          {startButton}
          </Col>
        </Row>
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
