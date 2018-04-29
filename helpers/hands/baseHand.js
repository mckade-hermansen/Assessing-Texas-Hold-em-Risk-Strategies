// parent class for all hand objects

class BaseHand {

  constructor(){
    this.outs = 5;
    this.prob = 0.0;
    this.name = 'base'
    this.inHand = false;
    this.weight = 0;
  }

  getOuts() { return this.outs; }
  getProb() { return this.prob; }
  getName() { return this.name; }
  inHand() { return this.inHand; }
  getWeight() { return this.weight; }

}

exports.BaseHand = BaseHand;