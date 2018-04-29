let straightFile = require('./straight');

class RoyalStraight extends straightFile.Straight {

  constructor() {
    super();
    this.name = 'RoyalStraight';
  }

  checkHand(cards) {
    let cur = super.checkStraight(cards, 9);
    this.outs = 5 - cur[0];
    this.missingCards = cur[1];
    super.findProb(cards);
  }
}

exports.RoyalStraight = RoyalStraight;