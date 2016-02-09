import React, {  Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom'

//this will require two parameter, so userid has to be parsed in first.
export default class JoinRoom extends Component {
  render() {
      return (
        <div>
          <h3>Choose your room</h3>
          <p>please enter the Room name you want to join or create: </p>
          <input type='text' ref='input' />
          <button onClick={e => this.handleClick(e)}>
            Join
          </button>
        </div>
      );
  }

  handleClick(e) {
    let node = findDOMNode(this.refs.input);
    let roomId = node.value.trim();
    let userId = this.props.userId;
    this.props.onJoinClick({roomId,userId});
    node.value = '';
  }
}
