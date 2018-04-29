let base = require('./baseHand');
let flushFile = require('./flush');
let straightFile = require('./straight');

class StraightFlush extends base.BaseHand {

  constructor() {
    super();
    this.name = 'straight flush';
    this.flush = new flushFile.Flush();
    this.straight = new straightFile.Straight();
    this.outs = 5;
    this.weight = 8;
  }

  findProb(cards) {
    if(this.flush.getOuts() > 7 - cards.length
        || this.straight.getOuts() > 7 - cards.length) {
          this.prob = 0.0;
          return;
        }
    if (this.flush.getProb() == 0 && this.straight.getProb() == 0){
      this.prob = 1.0;
      return;
    }
    this.prob = this.flush.getProb() * this.straight.getProb();
  }

  checkHand(cards) {
    this.flush.checkHand(cards);
    this.straight.checkHand(cards);
    this.outs = Math.max(this.flush.getOuts(), this.straight.getOuts());
    this.findProb(cards);
  }
}

exports.StraightFlush = StraightFlush;