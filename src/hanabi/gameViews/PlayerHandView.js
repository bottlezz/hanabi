import React, { Component, PropTypes } from 'react'
import {playerService, gameService} from '../gameServices'
import {gameStages} from "../models"
import {Events} from '../../actions'
import socket from '../../socketStore'
import SingleInputWithButton from "../../components/SingleInputWithButton"
import {Grid,Row,Col,ButtonGroup,Button} from 'react-bootstrap'

export default class PlayerHandView extends Component {
    constructor(props){
        super(props);
        this.state = {selectedCardIndex:null};

    }
    render(){
        let option=null;
        if(this.state.selectedCardIndex!=null){
            let card = this.props.hand[this.state.selectedCardIndex]
            option = <OthersHandOption color={card.color} number={card.number}/>
        }
        if(this.props.isSelf) option = (
            <MyHandOption selectedCardIndex={this.state.selectedCardIndex}
                          onPlayClick={index => this.handlePlay(index).bind(this)}
                          onDiscardClick={index => this.handleDiscard(index).bind(this)}
            />
        );

        return (<Row><Col xs={12}>
            <Row>
                {this.props.isSelf?this.props.hand.map(this.renderMyCard.bind(this)):
                    this.props.hand.map(this.renderCard.bind(this))}
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
    renderMyCard(item,index){
        if(item == null)return null;
        let cardStyle = {border:'black solid 1px'};
        if(this.state.selectedCardIndex!=null && this.state.selectedCardIndex == index ){
            cardStyle = {border:'red solid 1px'};
        }
        return (
            <Col xs={2} key={index} style={cardStyle} onClick={this.handleSelect.bind(this,index)} >
                <div>{item.hintNumber?item.hintNumber:'?'}</div>
                <div>{item.hintColor?item.hintColor:'?'}</div>
            </Col>)
    }
    renderCard (item,index){
        if(item == null)return null;
        let cardStyle = {border:'black solid 1px'};
        if(this.state.selectedCardIndex!=null && this.state.selectedCardIndex == index ){
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
                <ButtonGroup>
                    <Button onClick={e => this.handlePlay(e)}>Play</Button>
                    <Button onClick={e => this.handleDiscard(e)}>Discard</Button>
                </ButtonGroup>
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
        if(this.props.color==null && this.props.number==null )return null;

        return (<Row>
            <Col xs={12}>
                <ButtonGroup>
                    <Button onClick={e => this.handleColorHint(e)}>{this.props.color}</Button>
                    <Button onClick={e => this.handleNumberHint(e)}>{this.props.number}</Button>
                </ButtonGroup>
            </Col>
        </Row>)
    }
    handleColorHint(e){

    }
    handleNumberHint(e){

    }
}