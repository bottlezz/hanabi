import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'

export default class CreateUser extends Component {
  render() {
    if(this.props.name==null){
      return (
        <div>
          <h3>Create User</h3>
          <p>Please enter your display name</p>
          <input type='text' ref='input' />

          <button onClick={e => this.handleClick(e)}>
            Create
          </button>

        </div>
      );
    }else{
      return (
        <div>Hello, <span>{this.props.name}</span></div>
      );
    }
  }
  handleClick(e) {
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
}
