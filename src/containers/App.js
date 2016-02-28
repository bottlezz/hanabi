import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getNewUserByName, addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import CreateUser from '../components/CreateUser';
import Room from './Room'
import Game from '../hanabi/Game'

class App extends Component {
  render() {
    const { dispatch,user,room,gameTable,players } = this.props
    //TODO, cookie support, get user from cookie
    return (
      <div>
        <CreateUser
          onAddClick={text =>dispatch(getNewUserByName(text))} name={user.name} />
        <div>
          <Room {...this.props}></Room>
        </div>

      </div>
    );
  }
}
// App.propTypes = {
//   visibleTodos: PropTypes.arrayOf(PropTypes.shape({
//     text: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired
//   }).isRequired).isRequired,
//   visibilityFilter: PropTypes.oneOf([
//     'SHOW_ALL',
//     'SHOW_COMPLETED',
//     'SHOW_ACTIVE'
//   ]).isRequired
// }

// function selectTodos(todos, filter) {
//   switch (filter) {
//     case VisibilityFilters.SHOW_ALL:
//       return todos
//     case VisibilityFilters.SHOW_COMPLETED:
//       return todos.filter(todo => todo.completed)
//     case VisibilityFilters.SHOW_ACTIVE:
//       return todos.filter(todo => !todo.completed)
//   }
// }

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    // visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    // visibilityFilter: state.visibilityFilter,

    user: state.user,
    room: state.room
  }
}

export default connect(select)(App)
