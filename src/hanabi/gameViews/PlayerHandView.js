import React, { Component, PropTypes } from 'react'
import {playerService, gameService} from '../gameServices'
import {gameStages} from "../models"
import {Events} from '../../actions'
import socket from '../../socketStore'
import SingleInputWithButton from "../../components/SingleInputWithButton"
import {Grid,Row,Col} from 'react-bootstrap'

export default class PlayerHandView extends Component {
    constructor(props){
        super(props);
        this.state = {selectedCardIndex:null};

    }
    render(){
        let option =<OthersHandOption />
        if(this.props.isSelf) option = (
            <MyHandOption selectedCardIndex={this.state.selectedCardIndex}
                          onPlayClick={index => handlePlay(index)}
                          onDiscardClick={index => handleDiscard(index)}
            />
        );

        return (<Row><Col xs={12}>
            <Row>
                {this.props.hand.map(this.renderCard.bind(this))}
            </Row>
            {option}

        </Col></Row>)
    }
    handleSelect(index){
        if(this.state.selectedCardIndex ==index ){
            this.setState({selectedCardIndex:null});
        }else{
            this.setState({selectedCardIndex:index});
        }

    }
    renderCard (item,index){
        if(item == null)return null;
        let cardStyle = {border:'black solid 1px'};
        if(this.state.selectedCardIndex && this.state.selectedCardIndex == index ){
            cardStyle = {border:'red solid 1px'};
        }
        return (
            <Col xs={2} key={index} style={cardStyle} onClick={this.handleSelect.bind(this,index)} >
                <div>{item.number}</div>
                <div>{item.color}</div>
            </Col>)
    }
    handlePlay(index){
        this.setState( {selectedCardIndex:null});
        this.props.play(index);

    }
    handleDiscard(index){

        this.setState( {selectedCardIndex:null});
        this.props.discard(index);

    }


}

class MyHandOption extends Component {
    render(){
        if(this.props.selectedCardIndex==null)return null;

        return (<Row>
            <Col xs={12}>
                <button onClick={e => this.handlePlay(e)}>Play</button>
                <button onClick={e => this.handleDiscard(e)}>Discard</button>
            </Col>
        </Row>)

    }
    handlePlay(e){
        this.props.onPlayClick(this.props.selectedCardIndex);
    }
    handleDiscard(e){
        this.props.onDiscardClick(this.props.selectedCardIndex)
    }

}
class OthersHandOption extends Component {
    render(){
        return null;
    }
}