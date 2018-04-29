let base = require('./baseHand');

class Flush extends base.BaseHand {
  
  constructor() {
    super();
    this.name = 'flush';
    this.suits = ['c', 'd', 'h', 's'];
    this.bestSuit = '';
    this.weight = 5;
  }

  checkFlush(cards, suit, players) {
    let count = 0;
    for (let i = 0; i < cards.length; i++){
      if (cards[i].getSuit() == suit){
        count++;
      }
    }
    return [count, suit];
  }

  findProb(cards, players) {
    if (this.outs > 7 - cards.length){
      this.prob = 0.0;
      return;
    }
    this.prob = 1.0;
    let cardsHidden = 52 - cards.length;
    let suitLeft = 13;
    for (let i = 0; i < cards.length; i++){
      if(cards[i].getSuit() == this.bestSuit){
        suitLeft -= 1;
      }
    }
    let limit = Math.min(this.outs, 7 - cards.length);
    for(let i = 0; i < limit; i++){
      this.prob *= suitLeft/cardsHidden;
      suitLeft -= 1;
      cardsHidden -= 1;
    }
  }

  checkHand(cards, players) {
    let max = 0;
    let curFlush = null;
    for (let i = 0; i < this.suits.length; i++){
      curFlush = this.checkFlush(cards, this.suits[i], players);
      if (curFlush[0] >= max){
        max = curFlush[0];
        this.bestSuit = curFlush[1];
      }
    }
    this.outs = 5 - max;
    if (this.outs > 0) {
      this.findProb(cards, players);
    }
    else {
      this.prob = 1.0;
    }
  }

}

exports.Flush = Flush;