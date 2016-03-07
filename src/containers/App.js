import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getNewUserByName, addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import Room from './Room'
import SingleInputWithButton from "../components/SingleInputWithButton"
import socket from '../socketStore'
import {Events} from '../actions'
import {onUserDataUpdate,onRoomCreation} from '../actions'
import {Grid,Row,Col} from 'react-bootstrap'
class App extends Component {
  render() {
    const { dispatch,user,room } = this.props
    //TODO, cookie support, get user from cookie
    var userLogin=(<Row></Row>);
    var roomLogin=(<Row><Col xs={12}>
      <div>your RoomId is {room.roomId}</div>
    </Col></Row>);
    if(user.userId){
      userLogin = (<Row><Col xs={12}>Hello, <span>{user.name}</span></Col></Row>)
    }else{
      let meta={
        label:"Name",
        description:"To start, enter a display name",
        submit:"Start"
      }
      userLogin = (<Row>
        <Col xs={12}>
        <SingleInputWithButton meta={meta}
        onButtonClick={text =>socket.emit(Events.GET_NEW_USER, {name:text})}>
      </SingleInputWithButton></Col></Row>)
      //for test
      // userLogin = (<SingleInputWithButton meta={meta}
      //   onButtonClick={text =>dispatch(onUserDataUpdate({userId:'1',name:text}))}>
      // </SingleInputWithButton>)
    }
    if(roomLogin)
    return (
      <Grid>
        {userLogin}
        {room.roomId==null?null:roomLogin}
        <Row>
          <Col xs={12}>
            <Room {...this.props}></Room>
          </Col>
        </Row>

      </Grid>
    );
  }
}

function select(state) {
  return {
    user: state.user,
    room: state.room,
    gameTable : state.gameTable,
    players: state.players
  }
}
export default connect(select)(App)
