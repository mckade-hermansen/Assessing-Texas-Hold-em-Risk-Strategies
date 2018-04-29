let base = require('./baseHand');
let pairFile = require('./pair');
let tripleFile = require('./triple');

class FullHouse extends base.BaseHand {

  constructor() {
    super();
    this.name = 'full house';
    this.outs = 3;
    this.triple = new tripleFile.Triple();
    this.pair = new pairFile.Pair();
    this.weight = 6;
  }

  findProb(cards) {
    this.prob = 1.0;
    if(this.outs == 0){
      return;
    }
    if(this.outs > 7 - cards.length){
      this.prob = 0.0;
      return;
    }
    if(this.pair.getProb() != 1.0){
      this.prob *= this.pair.getProb();
    }
    if(this.triple.getProb() != 1.0){
      this.prob *= this.triple.getProb();
    }
  }

  checkHand(cards) {
    let tempCards = cards.slice();
    this.triple.checkHand(cards);
    let count = 0;
    for(let i = 0; i < cards.length; i++){
      if (cards[i].card[0] == this.triple.getTriple()){
        let index = tempCards.indexOf(cards[i]);
        if (index != -1){
          count += 1;
          tempCards.splice(index, 1);
        }
      }
    }
    this.pair.checkHand(tempCards);
    this.outs -= (count - 1);
    if (this.pair.getPair().length == 2){
      this.outs -= 1;
    }
    this.findProb(cards);
  }

}

exports.FullHouse = FullHouse;