import store from '../reduxStore'
import {updatePlayers,initiateGame,updateTable} from '../actions'
import {gameStages} from './models'
import SingleInputWithButton from "../components/SingleInputWithButton"

export const ServiceCall = {
    game_start: 'start'
};

class PlayerService{
    constructor(){

    }
    updateAll(players){
        store.dispatch(updatePlayers(players))
    }
    addPlayer(player){
        let players = store.getState().players;
        for(let i=0; i< players.length; i++){
            if(players[i].id== player.id){
                return
            }
        }
        players.push(player);
        store.dispatch(updatePlayers(players))
    }
    getPlayer(userId){
        let players = store.getState().players;
        for(let i=0; i< players.length; i++){
            if(players[i].id== userId){
                return players[i];
            }
        }
        return null;
    }
    setActivePlayer(id){
        let players = store.getState().players;
        for(let i=0; i< players.length; i++){
            if(players[i].id== id){
                players[i].status=1;
            }else{
                players[i].status=0;
            }
        }
    }
    getActivePlayer(){
        let players = store.getState().players;
        for(let i=0; i< players.length; i++){
            if(players[i].status== 1 || players[i].status== 3){
                return players[i]
            }
        }
    }
}
class GameService{
    constructor(){

    }
    startGame(data){
        console.log("startGame")
        let table=data;
        let players=store.getState().players;

        let numOfPlayers = players.length;
        let cardLimit =5;
        if( numOfPlayers > 3)cardLimit =4;

        for(let i =0;i< numOfPlayers; i++){
            players[i].hand=[];
            for(let j=0;j< cardLimit;j++){
                let index=i*cardLimit+j;
                players[i].hand.push(table.cardDeck[index]);
            }
        }
        table.cardDeck.splice(0,numOfPlayers*cardLimit);
        table.stage = gameStages.gameOn;
        table.life=3;
        table.hint=8;
        store.dispatch(updatePlayers((players)));
        store.dispatch(updateTable(table));

    }
    playerPlayCard(userId, cardIndex){
        let players = store.getState().players;
        let table = store.getState().gameTable;


        let currentPlayer = null;
        let nextPlayer = null;
        for(let i=0; i< players.length; i++){
            if(players[i].status== 1){
                currentPlayer = players[i];
                nextPlayer = players[(i+1)%players.length];
            }
        }
        let playedCard = currentPlayer.hand[cardIndex];
        table.gameMessage = currentPlayer.displayName+" has played  "+playedCard.color+" "+playedCard.number+". ";

        if(this.isValidPlay(playedCard)){
            if(playedCard.number > 1){
                for(let i=0;i<table.playedCards.length;i++){
                    if(table.playedCards[i].color == playedCard.color){
                        //remove previous card and replaced by the new one.
                        table.playedCards.splice(i,1,playedCard);
                        break;
                    }
                }
            }else{
                table.playedCards.push(playedCard);
            }

            if(playedCard.number == 5 && table.hint<8)table.hint++;
        }else{
            table.life--;
            table.discardDeck.push(playedCard);
        }

        currentPlayer.hand.splice(cardIndex,1);
        if(table.cardDeck.length>0){

            currentPlayer.hand.push(table.cardDeck[0]);
            currentPlayer.status = 0;
            nextPlayer.status =1;

            table.cardDeck.splice(0,1);
        }else{
            currentPlayer.status = 2;
            nextPlayer.status++;
        }


        store.dispatch(updatePlayers((players)));
        store.dispatch(updateTable(table));


    }
    playerHint(userId, hintVal){
        let players = store.getState().players;
        let table = store.getState().gameTable;

        let targetPlayer = null;
        for(let i=0; i< players.length; i++){
            if(players[i].id== userId){
                targetPlayer = players[i];
            }
        }
        //put hint to the card
        for(let i=0;i<targetPlayer.hand.length;i++){
            let card = targetPlayer.hand[i];
            if(card.color == hintVal)card.hintColor = hintVal;
            if(card.number == hintVal) card.hintNumber = hintVal;
        }
        table.hint--;

        let currentPlayer = null;
        let nextPlayer = null;
        for(let i=0; i< players.length; i++){
            if(players[i].status== 1){
                currentPlayer = players[i];
                nextPlayer = players[(i+1)%players.length];
            }
        }
        if(table.cardDeck.length>0){
            currentPlayer.status = 0;
            nextPlayer.status = 1;
        }else{
            currentPlayer.status = 2;
            if(nextPlayer.status = 2){
                //next player already done his last turn
                currentPlayer.status = 2;
                nextPlayer.status++;

            }else{
                //next player can still have one more turn.
                nextPlayer.status = 1;
            }
        }
        table.gameMessage = targetPlayer.displayName+" has been hinted with '"+hintVal+"'. ";
        store.dispatch(updatePlayers((players)));
        store.dispatch(updateTable(table));
    }
    playerDiscardCard(userId,cardIndex){
        let players = store.getState().players;
        let table = store.getState().gameTable;


        let currentPlayer = null;
        let nextPlayer = null;
        for(let i=0; i< players.length; i++){
            if(players[i].status== 1){
                currentPlayer = players[i];
                nextPlayer = players[(i+1)%players.length];
            }
        }
        let playedCard = currentPlayer.hand[cardIndex];
        if(table.hint<8){
            table.hint++;
        }
        table.gameMessage = currentPlayer.displayName+" has discarded  "+playedCard.color+" "+playedCard.number+". ";


        table.discardDeck.push(playedCard);
        currentPlayer.hand.splice(cardIndex,1);
        if(table.cardDeck.length>0){

            currentPlayer.hand.push(table.cardDeck[0]);
            currentPlayer.status = 0;
            nextPlayer.status = 1;

            table.cardDeck.splice(0,1);
        }else{
            currentPlayer.status = 2;
            if(nextPlayer.status = 2){
                //next player already done his last turn
                currentPlayer.status = 2;
                nextPlayer.status++;

            }else{
                //next player can still have one more turn.
                nextPlayer.status = 1;
            }
        }


        store.dispatch(updatePlayers((players)));
        store.dispatch(updateTable(table));

    }
    setNextPlayerActive(players){
        let currentPlayer = null;
        let nextPlayer = null;
        for(let i=0; i< players.length; i++){
            if(players[i].status== 1){
                currentPlayer = players[i];
                nextPlayer = players[(i+1)%players.length];
            }
        }
        return players;
    }
    isValidPlay(card){
        let table = store.getState().gameTable;
        let playedCards = table.playedCards;
        let isSuccessive=false;
        if(card.number == 1) isSuccessive = true;
        for(let i=0;i<playedCards.length;i++){
            if(playedCards[i].color == card.color){
                if(playedCards[i].number == card.number)return false;
                if(playedCards[i].number == (card.number-1))isSuccessive = true;

            }
        }
        return isSuccessive;
    }
    gameOver(){
        let table = store.getState().gameTable;
        table.stage = gameStages.gameOver;
        console.log("game over");
        store.dispatch(updateTable(table));

    }

    getActivePlayer(){
        let players = store.getState().players;
        for(let i=0; i< players.length; i++){
            if(players[i].status== 1){
                return players[i]
            }
        }
    }
    createDeck(){
        let cardDeck = [];
        for(let i=1;i<6;i++){
            cardDeck.push( Card("red",i));
            cardDeck.push( Card("yellow",i));
            cardDeck.push( Card("white",i));
            cardDeck.push( Card("green",i));
            cardDeck.push( Card("blue",i));
        }
        for(let i=1;i<5;i++){
            cardDeck.push( Card("red",i));
            cardDeck.push( Card("yellow",i));
            cardDeck.push( Card("white",i));
            cardDeck.push( Card("green",i));
            cardDeck.push( Card("blue",i));
        }
        for(let i=1;i<2;i++){
            cardDeck.push( Card("red",i));
            cardDeck.push( Card("yellow",i));
            cardDeck.push( Card("white",i));
            cardDeck.push( Card("green",i));
            cardDeck.push( Card("blue",i));
        }
        for(let i=1;i<15;i++){
            this.shuffleDeck(cardDeck);
        }

        return cardDeck;
    }
    shuffleDeck(cardDeck){
        let length=cardDeck.length;
        for(let i=0;i<length;i++){
            let ran=Math.floor(Math.random()*length);
            //swap
            let t=cardDeck[i];
            cardDeck[i]=cardDeck[ran];
            cardDeck[ran] = t;
        }
    }
}
function Card(color,number){
    return {color,number,hintColor:null,hintNumber:null}
}
export const playerService = new PlayerService();
export const gameService = new GameService();
