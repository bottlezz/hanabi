import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getNewUserByName, addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import Room from './Room'
import SingleInputWithButton from "../components/SingleInputWithButton"


class App extends Component {
  render() {
    const { dispatch,user } = this.props
    //TODO, cookie support, get user from cookie
    var userLogin="";
    if(user.userId){
      userLogin = (<div>Hello, <span>{user.name}</span></div>)
    }else{
      let meta={
        label:"Name",
        description:"To start, enter a display name",
        submit:"Start"
      }
      userLogin = (<SingleInputWithButton meta={meta}
        onButtonClick={text =>dispatch(getNewUserByName(text))}>
      </SingleInputWithButton>)
    }
    return (
      <div>
        {userLogin}

        <div>
          <Room {...this.props}></Room>
        </div>

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
