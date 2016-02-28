import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import {getRoom} from '../actions'
import socket from '../socketStore'
import {Events} from '../actions'
import SingleInputWithButton from "../components/SingleInputWithButton"

export default class Room extends Component {

  render() {
    const { dispatch,user,room,gameTable,players }=this.props
    var joinRoomMeta = {
      label:"Join Room",
      description:"please enter the Room name you want to join or create",
      submit:"Join"
    }
    if(user.userId==null){
      //TODO:will need to refine this, user can be a guest.
      return <div></div>;
    }else{

      if(room.roomId == null){
        return (
          //Display the box for join room
          <SingleInputWithButton meta={joinRoomMeta}
            onButtonClick = {data=>socket.emit(Events.GET_ROOM , data)}/>)
      }else{
        // game logic starts here
        return (
          <div>
            <div>your RoomId is {room.roomId}</div>
            <div>
              <p>UserList</p>
              <UserList users={room.users}/>
            </div>
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
