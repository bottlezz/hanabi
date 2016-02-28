import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'

export default class SingleInputWithButton extends Component {
  render() {
      return (
        <div>
          <h3>{this.props.meta?this.props.meta.label:'label'}</h3>
          <p>{this.props.meta?this.props.meta.description:'description'}</p>
          <input type='text' ref='input' />
          <button onClick={e => this.handleClick(e)}>
            {this.props.meta?this.props.meta.submit:'submit'}
          </button>
        </div>
      )
  }
  handleClick(e) {
    const node = findDOMNode(this.refs.input);
    const text = node.value?node.value.trim():null;
    this.props.onButtonClick(text);
    node.value = '';
  }
}
