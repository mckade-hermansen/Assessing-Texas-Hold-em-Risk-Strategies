
let base = require('./baseHand');

class Quad extends base.BaseHand {

  constructor() {
    super();
    this.name = 'quad';
    this.outs = 3;
    this.quad = '';
    this.weight = 7;
  }

  getTriple() { return this.triple; }

  checkTriple(cards, card) {
    let count = 1;
    for (let i = 0; i < cards.length; i++){
      if (card.getValue() == cards[i].getValue()
      && card.getSuit() != cards[i].getSuit()){
        count += 1;
      }
    }
    if (count >= 4){
      this.quad = card[0];
    }
    return count;
  }

  findProb(cards, players) {
    this.prob = 1.0;
    if (this.outs == 0){
      return;
    }

    if (this.outs > 7 - cards.length){ //not enough cards to make triple
      this.prob = 0.0;
      return;
    }

    let limit = Math.min(this.outs, 7 - cards.length);
    let target = this.outs;
    let cardsHidden = 52 - cards.length;
    for(let i = 0; i < limit; i++) {
      this.prob *= target/cardsHidden;
      target -= 1;
      cardsHidden -= 1;
    }
  }

  checkHand(cards, players) {
    let max = 0;
    let cur = 0;
    for (let i = 0; i < cards.length; i++){
      cur = this.checkTriple(cards, cards[i]);
      if (cur >= max){
        max = cur;
      }
    }
    this.outs = Math.max(this.outs - max, 0);
    this.findProb(cards, players);
  }
}

exports.Quad = Quad;