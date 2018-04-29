
# CS 5110 Final

## Introduction

This project assesses risk strategies in a game of poker. It places four different risk strategy agents in an emulated game of Texas Hold'em and displays each agent's winnings.

## How To Run a Full Tournament

To run a full tournament locate the tournament.js file and require the files of the agents you want to be in the tournament. Next, locate the challenger_test.js file and change the ChallBot to be the specific agent you want to monitor. Then write the following commands into your command line.

$ npm install
$ npm test

It will display every hand and the winnings of the agent that is being monitored as well as display every agents final standings at the end. 

## How To Run a A Single Round

To be able to see the action of a specific agent after each betting opportunity, first locate the play.js file and again change the ChallBot variable to be the file of the agent you would like to monitor. The agents in the round are also located in the tournament.js file, edit the file if you want specific agents in the round. Then, type the following in your command line.

$ node play.js

It will output each players action at every betting opportunity. 

## How To Test Single Functions

Locate the test/tests.js file and place any commands you would like to execute to test functions or classes. Then to run the file simply type the following into the command line.

$ node test/tests.js

## References

Starter code for emulating Texas Hold'em game:
https://github.com/mdp/JsPoker

