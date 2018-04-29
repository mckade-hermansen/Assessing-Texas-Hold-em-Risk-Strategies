// // child class of the base hand for a pair

let base = require('./baseHand');

class Pair extends base.BaseHand {

  constructor() {
    super();
    this.name = 'pair';
    this.outs = 1;
    this.pair = [];
    this.weight = 1;
  }

  getPair() { return this.pair; }
  
  checkPair(cards, card) {
    for (let i = 0; i < cards.length; i++){
      if (card.getValue() == cards[i].getValue()
      && card.getSuit() != cards[i].getSuit()){
        this.inHand = true;
        this.outs = 0;
        this.prob = 1.0;
        this.pair = [card, cards[i]];
        return true;
      }
    }
  }
  
  findProb(cards) {
    let cardsHidden = 52 - cards.length;
    this.prob = 3/cardsHidden;
  }

  checkHand(cards) {
    for (let i = 0; i < cards.length; i++){
      if(this.checkPair(cards, cards[i])){
        return;
      }
    }
    this.pair = [cards[0]];
    this.findProb(cards);
  }

}

exports.Pair = Pair;