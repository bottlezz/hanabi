import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'

export default class Room extends Component {
  render() {
    return (
      <div>
        Join Room
        <input type='text' ref='input' />

        <button onClick={e => this.handleClick(e)}>
          Join
        </button>
      </div>
    );
  }
  handleClick(e) {
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
}
