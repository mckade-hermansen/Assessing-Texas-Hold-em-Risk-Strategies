let basePlayer = require('./basePlayer');


class RiskAdverse extends basePlayer.Player {
  
  constructor() {
    super();
    this.call = 40;
    this.bet = 10;
    this.lost = 0;
    this.lostThresh = 100;
  }

  updateRisk() {
    let max = this.hand.getMaxWeight();
    this.call *= max;
    this.lostThresh *= max;
  }

  preFlopStrat(game) { 
    this.updateRisk();
    if (super.shouldFold(game)){
      return 0;
    }
    if (this.hand.hasHand('pair')){
      this.lost += game.betting.call;
      return game.betting.call;
    }
    else {
      this.lost += game.betting.call;
      return game.betting.call;
    }
  }

  flopStrat(game) { 
    this.updateRisk();
    if (super.shouldFold(game)){
      return 0;
    }
    if (this.hand.hasMinWeight(3)){
      this.lost += game.betting.raise;
      return game.betting.raise;
    }
    if (!this.hand.hasMinWeight(1)){
      return 0;
    }
    else {
      this.lost += game.betting.call;
      return game.betting.call;
    }
  }

  turnStrat(game) { 
    this.updateRisk();
    if (super.shouldFold(game)){
      return 0;
    }
    if (this.hand.hasMinWeight(4)){
      this.lost += game.betting.raise;
      return game.betting.raise;
    }
    if (this.hand.hasHand('pair')){
      if (this.hand.getPair()[0].getValue() > 8){
        this.lost += game.betting.call;
        return game.betting.call;
      }
      return 0;
    }
    if (this.hand.hasMinWeight(2)){
      this.lost += game.betting.call;
      return game.betting.call;
    }
    else {
      return 0;
    }
  }

  riverStrat(game) { 
    this.updateRisk();
    if (super.shouldFold(game)){
      return 0;
    }
    if (this.hand.hasMinWeight(4)){
      this.lost += game.betting.raise;
      return game.betting.raise;
    }
    if (this.hand.hasHand('pair')){
      if (this.hand.getPair()[0].getValue() > 8){
        this.lost += game.betting.call;
        return game.betting.call;
      }
      return 0;
    }
    if (this.hand.hasMinWeight(3)){
      this.lost += game.betting.call;
      return game.betting.call;
    }
    else {
      return 0;
    }
  }
  
  update(game) {
    return super.update(game);
  }
  
}

// exports.RiskAdverse = RiskAdverse;


module.exports = function() {
  var info = {
    name: "risk adverse",
    email: "mckade.hermansen@gmail.com",
    btcWallet: "NONE"
  };
  let riskAdverse = new RiskAdverse();
  let player = new basePlayer.Player();
  return { update: riskAdverse.update, info: info, base: player, player: riskAdverse}
}