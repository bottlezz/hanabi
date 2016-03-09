import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import {getRoom,onRoomCreation} from '../actions'
import {gameStages} from "../hanabi/models"
import socket from '../socketStore'
import {Events} from '../actions'
import SingleInputWithButton from "../components/SingleInputWithButton"
import Game from './Game'
import {Grid,Row,Col} from 'react-bootstrap'

export default class Room extends Component {

  render() {
    const { user,room,gameTable}=this.props


    if(user.userId==null){
      //TODO:will need to refine this, user can be a guest.
      return <div></div>;
    }else{

      if(room.roomId == null){
        let joinRoomMeta = {
          label:"Join Room",
          description:"please enter the Room name you want to join or create",
          submit:"Join"
        };
        return  <SingleInputWithButton meta={joinRoomMeta}
             onButtonClick = {text=>socket.emit(Events.GET_ROOM , { roomId:text, userId:user.userId})}/>
      }else{
        // game logic starts here
        return (
          <Row>
            <Col xs={12}>
              <Game {...this.props}/>
            </Col>
          </Row>

        )
      }
    }
  }
}
class UserListView extends Component {
  render(){
    var userItem = function(item){
      return <p key={item}>{item}</p>
    }
    return <Row><Col xs={8}>
          <h4>UserList</h4>
            <ul>{this.props.users.map(userItem)}</ul>
        </Col></Row>
  }
}
