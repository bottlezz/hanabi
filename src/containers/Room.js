import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import {getRoom} from '../actions'
import JoinRoom from '../components/JoinRoom'

export default class Room extends Component {

  render() {
    const { dispatch,user,room,gameTable,players }=this.props
    if(user.userId==null){
      //TODO:will need to refine this, user can be a guest.
      return <div></div>;
    }else{

      if(room.roomId == null){
        return (
          //Display the JoinRoom view
          <JoinRoom userId={user.userId}
            onJoinClick = {data=>dispatch(getRoom(data))}/>)
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
