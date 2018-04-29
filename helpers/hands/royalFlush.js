let royalStraightFile = require('./royalStraight');
let flushFile = require('./flush');
let base = require('./baseHand');

class RoyalFlush extends base.BaseHand {

  constructor() {
    super();
    this.name = 'royal flush';
    this.royalStraight = new royalStraightFile.RoyalStraight();
    this.flush = new flushFile.Flush();
    this.weight = 9;
  }

  findProb(cards) {
    if (this.outs > 7 - cards.length){
      this.prob = 0.0;
      return;
    }
    if (this.flush.getOuts() == 0 && this.royalStraight.getOuts() == 0) {
      this.prob = 1.0;
      return;
    }
    this.prob = this.flush.getProb() * this.royalStraight.getProb();
  }

  checkHand(cards) {
    this.royalStraight.checkHand(cards);
    this.flush.checkHand(cards);
    this.outs = Math.max(this.flush.getOuts(), this.royalStraight.getOuts());
    this.findProb(cards);
  }
}

exports.RoyalFlush = RoyalFlush;