import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getNewUserByName, addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import Room from './Room'
import SingleInputWithButton from "../components/SingleInputWithButton"
import socket from '../socketStore'
import {Events} from '../actions'
import {onUserDataUpdate,onRoomCreation} from '../actions'
import {Grid,Row,Col,Navbar} from 'react-bootstrap'
class App extends Component {
  render() {
    const { dispatch,user,room } = this.props;
    //TODO, cookie support, get user from cookie
    let meta={
      label:"Name",
      description:"To start, enter a display name",
      submit:"Start"
    };
    let userLogin = (
    <SingleInputWithButton meta={meta}
      onButtonClick={text =>socket.emit(Events.GET_NEW_USER, {name:text})}>
    </SingleInputWithButton>);

    let UserInfo=user.userId?(<Navbar.Text>Hello, {user.name}</Navbar.Text>):null;
    let RoomInfo = room.roomId?(<Navbar.Text pullRight>{room.users.length} user(s) in room {room.roomId}</Navbar.Text>):null;
    const navBarInstance = (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a>GODABA</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {UserInfo}
            {RoomInfo}
          </Navbar.Collapse>
        </Navbar>
    )
    return (
      <div>
        {navBarInstance}
        <Grid>
          {user.userId?null:userLogin}
          <Row>
            <Col xs={12}>
              <Room {...this.props}></Room>
            </Col>
          </Row>
        </Grid>
      </div>
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
