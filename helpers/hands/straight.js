let base = require('./baseHand');

class Straight extends base.BaseHand {

  constructor() {
    super();
    this.name = 'straight';
    this.outs = 4;
    this.cardNumbers = ['A',2,3,4,5,6,7,8,9,'T','J','Q','K','A'];
    this.missingCards = [];
    this.weight = 4;
  }

  checkStraight(cards, start) {
    let count = 0;
    let missing = [];
    let found = false;
    for(let i = 0; i < 5; i++){
      found = false;
      for(let j = 0; j < cards.length; j++){
        if (start >= this.cardNumbers.length){
          break;
        }
        if (cards[j].card[0] == this.cardNumbers[start]){
          count += 1;
          found = true;
          break;
        }
      }
      if (!found){
        missing.push(this.cardNumbers[start]);
      }
      start += 1;
    }

    return [count, missing];
  }

  cardsLeft(cards, cardNumber) { // so duplicates are not counted twice
    let count = 4;
    for(let i = 0; i < cards.length; i++){
      if(cards[i].card[0] == cardNumber){
        count -= 1;
      }
    }
    return count;
  }

  findProb(cards) {
    this.prob = 1.0;
    if (this.outs == 0){
      return;
    }
    if (this.outs > 7 - cards.length){
      this.prob = 0;
      return;
    }
    let cardsHidden = 52 - cards.length;

    for(let i = 0; i < this.missingCards.length; i++){
      this.prob *= this.cardsLeft(cards, this.missingCards[i])/cardsHidden;
      cardsHidden -= 1;
    }
  }

  checkHand(cards) {
    let max = 0;
    let cur = 0;
    for(let i = 0; i < this.cardNumbers.length; i++){
      cur = this.checkStraight(cards, i);
      if (cur[0] >= max){
        max = cur[0];
        this.missingCards = cur[1];
      }
    }
    this.outs = 5 - max;
    this.findProb(cards);
  }

}

exports.Straight = Straight;