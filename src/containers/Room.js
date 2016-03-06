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
    const { dispatch,user,room,gameTable}=this.props
    var joinRoomMeta = {
      label:"Join Room",
      description:"please enter the Room name you want to join or create",
      submit:"Join"
    }
    let joinRoomView = (<Row><Col xs={8}>
      <SingleInputWithButton meta={joinRoomMeta} onButtonClick = {text=>socket.emit(Events.GET_ROOM , { roomId:text, userId:user.userId})}/>
    </Col></Row>);
    //TODO:for test
    // let joinRoomView = (<SingleInputWithButton meta={joinRoomMeta}
    //        onButtonClick = {text => dispatch(onRoomCreation({roomId:'1',roomData:null,users:['1']}))}> </SingleInputWithButton>);
    let userListView =(<Row><Col xs={8}>
      <p>UserList</p>
      <UserList users={room.users}/>
    </Col></Row>);
    if(gameTable.stage == gameStages.gameOn )userListView=(<div></div>)
    if(user.userId==null){
      //TODO:will need to refine this, user can be a guest.
      return <div></div>;
    }else{

      if(room.roomId == null){
        return (<div>
          {joinRoomView}
          </div>)


      }else{
        // game logic starts here
        return (
          <div>
            <div>your RoomId is {room.roomId}</div>
            {userListView}

            <Game {...this.props}/>
          </div>

        )
      }
    }
  }
}
class UserList extends Component {
  render(){
    var userItem = function(item){
      return <li key={item}>{item}</li>
    }
    return <ul>{this.props.users.map(userItem)}</ul>
  }
}
