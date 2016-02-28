
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
    return;
  }
  remove(index){
    this.cards.splice(index,1);
  }
}
export class player{
  constructor(){
    this.displayName="";
    this.status=0;
    this.hand=new Hand();
  }
}
