let pairFile = require('./hands/pair');
let tripleFile = require('./hands/triple');
let twoPairFile = require('./hands/twoPair');
let straightFile = require('./hands/straight');
let flushFile = require('./hands/flush');
let fullHouseFile = require('./hands/fullHouse');
let straightFlushFile = require('./hands/straightFlush');
let royalFlushFile = require('./hands/royalFlush');


// Class to handle a single hand
class Hand {
  
  constructor(cards) {
    this.hands = [new royalFlushFile.RoyalFlush(), new straightFlushFile.StraightFlush(), 
                  new fullHouseFile.FullHouse(), new flushFile.Flush(), new straightFile.Straight(),
                  new twoPairFile.TwoPair(), new tripleFile.Triple(), new pairFile.Pair()];
    this.fullHands = [];
    this.checkHands(cards)
  }

  getHands() { return this.hands; }
  getFullHands() { return this.fullHands; }

  hasHand(hand) {
    for(let i = 0; i < this.fullHands.length; i++) {
      if (this.fullHands[i].getName() == hand){
        return true;
      }
    }
    return false;
  }

  hasMinWeight(weight) {
    for (let i = 0; i < this.fullHands.length; i++) {
      if (this.fullHands[i].getWeight() >= weight){
        return true;
      }
    }
    return false;
  }

  getMaxWeight() {
    let max = 1;
    for (let i = 0; i < this.fullHands.length; i++) {
      if (this.fullHands[i].getWeight() > max){
        max = this.fullHands[i].getWeight();
      }
    }
    return max;
  }

  getPair() {
    for(let i = 0; i < this.fullHands.length; i++) {
      if (this.fullHands[i].getName() == 'pair'){
        return this.fullHands[i].getPair();
      }
    }
  }

  checkHands(cards) {
    for (let i = 0; i < this.hands.length; i++) {
      this.hands[i].checkHand(cards);
      if (this.hands[i].getProb() == 1){
        this.fullHands.push(this.hands[i]);
      }
    }
    for (let i = 0; i < this.fullHands.length; i++) {
      let index = this.hands.indexOf(this.fullHands[i]);
      if (index != -1){
        this.hands.splice(index,1);
      }
    }
  }

  print() {
    console.log('==== Full Hands ====');
    for (let i = 0; i < this.fullHands.length; i++) {
      console.log(this.fullHands[i].getName(), ' ', this.fullHands[i].getProb());
    }
    console.log('==== Hands ====');
    for (let i = 0; i < this.hands.length; i++) {
      console.log(this.hands[i].getName(), ' ', this.hands[i].getProb());
    }
  }

}

exports.Hand = Hand;
