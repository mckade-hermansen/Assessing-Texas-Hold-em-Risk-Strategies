let base = require('./baseHand');
let pairFile = require('./pair');

class TwoPair extends base.BaseHand {

  constructor() {
    super();
    this.name = 'two pair';
    this.outs = 2;
    this.firstPair = new pairFile.Pair();
    this.secondPair = new pairFile.Pair();
    this.weight = 2;
  }

  findProb(cards) {
    if (this.outs == 0){
      this.prob = 1.0;
      return;
    }

    if (this.outs > 7 - cards.length){
      this.prob = 0.0;
      return;
    }

    let cardsHidden = 52 - cards.length;
    this.prob = 3/cardsHidden;
    if(this.outs == 2) { // this.outs = 2
      this.prob *= 3/(cardsHidden-1);
    }
  }

  checkHand(cards) {
    let tempCards = cards.slice();
    this.firstPair.checkHand(tempCards);
    let pair1 = this.firstPair.getPair();
    if (pair1.length == 2){
      this.outs -= 1;
    }
    for (let i = 0; i < pair1.length; i++) {
      let index = tempCards.indexOf(pair1[i]);
      tempCards.splice(index,1);
    }
    this.secondPair.checkHand(tempCards);
    if (this.secondPair.getPair().length == 2){
      this.outs -= 1;
    }
    this.findProb(cards);
  }
}

exports.TwoPair = TwoPair;