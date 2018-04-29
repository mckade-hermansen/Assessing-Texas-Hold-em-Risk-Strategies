let basePlayer = require('./basePlayer');


class RiskSeeking extends basePlayer.Player {
  
  constructor() {
    super();
    this.call = 400;
    this.bet = 10;
    this.lost = 0;
    this.lostThresh = 1000;
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
      this.lost += game.betting.raise;
      return game.betting.raise;
    }
    return game.betting.call;
  }

  flopStrat(game) { 
    this.updateRisk();
    if (super.shouldFold(game)){
      return 0;
    }
    if (this.hand.hasMinWeight(4)){
      this.lost += game.betting.raise * 6;
      return game.betting.raise * 6;
    }
    if (this.hand.hasMinWeight(2)){
      this.lost += game.betting.raise * 3;
      return game.betting.raise * 3;
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
    if (this.hand.hasMinWeight(5)){
      //this.lost += game.betting.raise * 3;
      return 1000;
    }
    if (this.hand.hasMinWeight(4)){
      //this.lost += game.betting.raise * 3;
      return 400;
    }
    // if (this.hand.hasHand('pair')){
    //     this.lost += game.betting.call;
    //     return game.betting.call;
    // }
    return game.betting.call;
  }

  riverStrat(game) { 
    this.updateRisk();
    if (super.shouldFold(game)){
      return 0;
    }
    if (this.hand.hasMinWeight(4)){
      //this.lost += game.betting.raise * 3;
      return 1000;
    }
    if (this.hand.hasMinWeight(3)){
      //this.lost += game.betting.raise * 3;
      return 400;
    }
    if (this.hand.hasHand('pair')){
        this.lost += game.betting.call;
        return game.betting.call;
    }
    return game.betting.call;
  }
  
  update(game) {
    return super.update(game);
  }
  
}

// exports.RiskAdverse = RiskAdverse;


module.exports = function() {
  var info = {
    name: "risk seeking",
    email: "mckade.hermansen@gmail.com",
    btcWallet: "NONE"
  };
  let riskSeeking = new RiskSeeking();
  let player = new basePlayer.Player();
  return { update: riskSeeking.update, info: info, base: player, player: riskSeeking}
}