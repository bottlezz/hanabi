import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import {Grid,Row,Col, Button,Input} from 'react-bootstrap'
export default class SingleInputWithButton extends Component {
  render() {
      return (
        <Row><Col xs={12} sm={6}>
          <h3>{this.props.meta?this.props.meta.label:'label'}</h3>
          <p>{this.props.meta?this.props.meta.description:'description'}</p>
            <Input type='text' ref='input' />

          <Button block onClick={e => this.handleClick(e)}>
            {this.props.meta?this.props.meta.submit:'submit'}
          </Button>

        </Col></Row>
      )
  }
  handleClick(e) {

    const node = this.refs.input;
    const text = node.getValue()?node.getValue().trim():null;
    this.props.onButtonClick(text);
    node.value = '';
  }
}
