export const gameStages = {
  gamePrepare: 'game_prepare',
  gameOn : 'game_on',
  gameOver : 'game_over'
};

export class Card{
  constructor(color,number){
    this.color = color;
    this.number = number;
    this.hintColor = null;
    this.hintNumber = null;
  }
}
export class Hand{
  constructor(){
    this.cards=[];
  }
  add(card){
    this.cards.push(card);

  }
  remove(index){
    this.cards.splice(index,1);
  }
}
export class Player{
  constructor(){
    this.id="";
    this.displayName="";
    this.status=0;
    this.hand=[];
  }
}
export class GameTable{
  constructor(){
    this.cardDeck=[];
    this.discardDeck=[];
    this.playedCard=[];
    this.status = 0;
    //
    this.life = 3;
    this.hint=8;
  }
}