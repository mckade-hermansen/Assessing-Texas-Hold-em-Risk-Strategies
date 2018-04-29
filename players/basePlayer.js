let cardFile = require('../helpers/card');
let handFile = require('../helpers/hand');

// base parent player class 
class Player {

  constructor() {
    // thresholds
    this.call = 0;
    this.bet = 0;
    this.cards = [];
    this.hand = null;
  }

  getCall() { return this.call; }
  getBet() { return this.bet; }
  preFlopStrat(game) { return 0; }
  flopStrat(game) { return 0; }
  turnStrat(game) { return 0; }
  riverStrat(game) { return 0; }

  shouldFold(game) {
    if (this.lost > this.lostThresh){
      return true;
    }
    if (game.betting.call > this.call) {
      return true;
    }
  }

  update(game) {
    if (game.state != 'complete'){
      let cards = [cardFile.Card(game.self.cards[0]), cardFile.Card(game.self.cards[1])];
      if(game.state == "pre-flop"){
        let hand = new handFile.Hand(cards);
        this.player.hand = hand;
        return this.player.preFlopStrat(game);
      }
      else if (game.state == 'flop') {
        for(let i = 0; i < 3; i++) {
          cards.push(cardFile.Card(game.community[i]));
        }
        let hand = new handFile.Hand(cards);
        this.player.hand = hand;
        return this.player.flopStrat(game);
      }
      else if (game.state == 'turn') {
        for(let i = 0; i < 4; i++) {
          cards.push(cardFile.Card(game.community[i]));
        }
        let hand = new handFile.Hand(cards);
        this.player.hand = hand;
        return this.player.turnStrat(game);
      }
      else {
        for(let i = 0; i < 5; i++) {
          cards.push(cardFile.Card(game.community[i]));
        }
        let hand = new handFile.Hand(cards);
        this.player.hand = hand;
        return this.player.riverStrat(game);
      }
    }
  }
  
}

exports.Player = Player;