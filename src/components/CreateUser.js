import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'

export default class CreateUser extends Component {
  render() {
    return (
      <div>
        Create User
        <input type='text' ref='input' />

        <button onClick={e => this.handleClick(e)}>
          Create
        </button>
        <div>{this.state==null?'NA':this.state.user.name}</div>
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
