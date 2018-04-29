let card = require('../helpers/card');
let base = require('../helpers/hands/baseHand');
let pair = require('../helpers/hands/pair');
let tripleFile = require('../helpers/hands/triple');
let twoPairFile = require('../helpers/hands/twoPair');
let straightFile = require('../helpers/hands/straight');
let flushFile = require('../helpers/hands/flush');
let fullHouseFile = require('../helpers/hands/fullHouse');
let straightFlushFile = require('../helpers/hands/straightFlush');
let royalStraightFile = require('../helpers/hands/royalStraight');
let royalFlushFile = require('../helpers/hands/royalFlush');
let handFile = require('../helpers/hand');

let card1 = card.Card('Ts');
let card2 = card.Card('Jc');
let card3 = card.Card('Kc');
let card4 = card.Card('Ac');
let card5 = card.Card('Qc');
let card6 = card.Card('5c');

let cards = [card1, card2, card3, card4];
let players = ['player1', 'player2'];

let p = new pair.Pair();
let flush = new flushFile.Flush();
let triple = new tripleFile.Triple();
let twoPair = new twoPairFile.TwoPair();
let straight = new straightFile.Straight();
let fullHouse = new fullHouseFile.FullHouse();
let straightFlush = new straightFlushFile.StraightFlush();
let royalStraight = new royalStraightFile.RoyalStraight();
let royalFlush = new royalFlushFile.RoyalFlush();
let hand = new handFile.Hand(cards);

// hand.checkHand(cards);
// console.log(royalFlush.getOuts());
// console.log(royalFlush.getProb());
hand.print();
