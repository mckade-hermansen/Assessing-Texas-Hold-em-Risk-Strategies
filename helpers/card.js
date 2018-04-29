// Class to handle a card object

exports.Card = function(card) {
  let that = {};

  that.getValue = function() {
    if (!isNaN(card[0])){
      return card[0];
    }
    else {
      if (card[0] == 'A'){
        return 14;
      }
      else if (card[0] == 'K') {
        return 13;
      }
      else if (card[0] == 'Q') {
        return 12;
      }
      else if (card[0] == 'J') {
        return 11;
      }
      else { // 'ten'
        return 10;
      }
    }
  };

  that.getSuit = function() {
    return card[1];
  };

  Object.defineProperty(that, 'card', {
    get: () => card
  });

  return that;
};