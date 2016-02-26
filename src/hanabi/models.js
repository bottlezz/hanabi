
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
export class GameStore {
  constructor(){
    this.data={cardDeck:[],cardGrave:[]}


    for(let i=1;i<6;i++){
      this.data.cardDeck.push(new Card("red",i));
      this.data.cardDeck.push(new Card("yellow",i));
      this.data.cardDeck.push(new Card("white",i));
      this.data.cardDeck.push(new Card("green",i));
      this.data.cardDeck.push(new Card("blue",i));
    }
    for(let i=1;i<5;i++){
      this.data.cardDeck.push(new Card("red",i));
      this.data.cardDeck.push(new Card("yellow",i));
      this.data.cardDeck.push(new Card("white",i));
      this.data.cardDeck.push(new Card("green",i));
      this.data.cardDeck.push(new Card("blue",i));
    }
    for(let i=1;i<2;i++){
      this.data.cardDeck.push(new Card("red",i));
      this.data.cardDeck.push(new Card("yellow",i));
      this.data.cardDeck.push(new Card("white",i));
      this.data.cardDeck.push(new Card("green",i));
      this.data.cardDeck.push(new Card("blue",i));
    }
    for(let i=0;i<10;i++)this.shuffle();


    console.log(this.data.cardDeck);
  }


};
