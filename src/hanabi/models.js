
export class Card{
  constructor(color,number){
    this.color = color;
    this.number = number;
  }
}
export class Hand{
  constructor(){}
  
}
export class GameData {
  constructor(){
    this.cardDeck = [];
    this.cardGrave = [];
    for(let i=1;i<6;i++){
      this.cardDeck.push(new Card("red",i));
      this.cardDeck.push(new Card("yellow",i));
      this.cardDeck.push(new Card("white",i));
      this.cardDeck.push(new Card("green",i));
      this.cardDeck.push(new Card("blue",i));
    }
    for(let i=1;i<5;i++){
      this.cardDeck.push(new Card("red",i));
      this.cardDeck.push(new Card("yellow",i));
      this.cardDeck.push(new Card("white",i));
      this.cardDeck.push(new Card("green",i));
      this.cardDeck.push(new Card("blue",i));
    }
    for(let i=1;i<2;i++){
      this.cardDeck.push(new Card("red",i));
      this.cardDeck.push(new Card("yellow",i));
      this.cardDeck.push(new Card("white",i));
      this.cardDeck.push(new Card("green",i));
      this.cardDeck.push(new Card("blue",i));
    }
    for(let i=0;i<10;i++)this.shuffle();


    console.log(this.cardDeck);
  }

  shuffle(){
    let length=this.cardDeck.length;
    for(let i=0;i<length;i++){
      let ran=Math.floor(Math.random()*length);
      //swap
      let t=this.cardDeck[i];
      this.cardDeck[i]=this.cardDeck[ran];
      this.cardDeck[ran] = t;

    }
  }
};
