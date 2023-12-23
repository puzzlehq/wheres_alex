# Where's Alex private multiparty game on Aleo 
Hide Alex and challenge a friend to find Alex -- winner gets the pot!

Alex's location is hidden onchain from the other party, and the entire game is hidden from everyone on chain so you can bet as much as you want without judgement :)

Built with Puzzle Wallet & Puzzle SDK -- uses programmable private multisigs under the hood!

### Where's Alex Leo Program Docs: [link](https://github.com/puzzlehq/wheres_alex/tree/main/program)
 
### Puzzle SDK Docs: [link](https://docs.puzzle.online/guides/getting_started/)
### Puzzle Devtools Site: [link](https://dev.puzzle.online/)

### Puzzle Wallet Google Chrome Download [link](https://chromewebstore.google.com/detail/puzzle-wallet/fdchdcpieegfofnofhgdombfckhbcokj)
### Puzzle Wallet iOS Download [link](https://testflight.apple.com/join/bikon7Nj)


[<img src="https://github.com/puzzlehq/serengeti/assets/39972641/9650a6b8-5680-4a53-b6c6-608b8809d38e">](https://wheresalex.puzzle.online/)


# About Where's Alex?
Where's Alex? is a fun experiment that aims to be a fun 1v1 game to showcase how to have a completely private multiparty game on Aleo! This technical overview reviews the issues with multiparty privacy and how this is solved using programmable private multisigs and incentives!

<br /> 

## What is the "Where's Alex?" game?
Hide alex in a secret location and wager another person on Aleo to guess where you hid Alex. If they guess wrong, then you win the prize pot between you both! 

 <br />

## So what's the point of the game?
Have fun with other members of the Aleo community, rack up some wins and rack up some puzzle pieces! 

<br />

The puzzle pieces don't mean anything and can be minted if you are running low -- they are just for fun to experiment with Leo token standards on what's necessary for programmbale private multisigs.

 <br />

## How does the game work?
The FE for the game utilizes key multisig features using the Puzzle Wallet and Puzzle SDK described below. <br /> <br />
The game is split into 3 Leo Programs described below:
1. Puzzle Pieces token program (with _n_ of _n_ programmable multisig functions)
2. Multiparty PVP utils program
3. Where's Alex program

<br /> 

If you're interested in building your own multiparty game on Aleo, fork this repo and give it a shot! 

# How to play Where's Alex
1. Starting a new game (challenger)
- mint Puzzle Pieces if you don't have already
- challenge another Aleo address
- hide alex in either the weeds or the bushes
- set your wager amount to win if your opponent guesses wrong!

<br /> 

2. Accepting a new game (opponent)
- mint puzzle pieces if you don't have already
- match wager from the challenger
- guess if alex is hiding in the weeds or the bushes
- accept the game and lock in the wagers to win if you guess correct!

<br /> 

3. Finishing a game (challenger)
- Reveal your answer
- Finish the geam and payout the wagers to you if the opponent guessed wrong or the opponent if they guessed right!


# How Where's Alex showcases how to solve issues in multiparty privacy

## Defining Multiparty Privacy
Multiparty privacy is a broad category and can be split into multiple categories based on use cases like:
1. n:1
2. 1:1:1
3. n:n

### n:1 multiparty privacy
One category of multiparty privacy is n:1 like a company's bank account

<br /> 

A company's bank account is multiparty and private -- _n_ people have ability to view/share an account, everyone outside of those _n_ people can't see the account balance, and it requires _t_ approvals to do an action on one account.

### 1:1:1 multiparty privacy
Another category of multiparty privacy is 1:1:1 is like a game like Guess Who?

<br /> 

The users share a single game state that is multiparty while pieces of that shared game state are private to each individual. 

Each player in the game has state that is private to themselves but needs to interactive with another player. The game state and individual private values may/may not be private to others outside of the two players, but each player wants to keep certain information private from the other. 

<p align="center">
  <img width="800" alt="image" src="https://github.com/puzzlehq/serengeti/assets/39972641/cf60c961-a96f-4814-8a6c-d1d9573c1f16">
</p>

<br />

## The main issues with multiparty privacy
Multiparty privacy suffers from 3 problems
1. Guarantees on privacy of data
2. Guarantees on routing of information between parties
3. Multiparty computation attacks: timeout, collusion, and denial of service

<br />

We can understand these problems specifically by looking at a game of online poker in web2.
<p align="center">
  <img width="800" height="400" alt="image" src="https://github.com/puzzlehq/serengeti/assets/39972641/01ceabd7-abb1-41bb-ba2f-773e3b6be0d5">
</p>

<br />

**1. Guarantees on privacy of data** <br />
The terms of service, the auditing by government, and the enforcement of law by the company's operating jurisdiction is the only guarantee you get that your hand is private to other players as well as the dealer. If you don't know or trust the brand/company, it's likely you won't feel the game is fair. 

The most common complaint of online poker is that the game is rigged because other players or the house can see your cards somehow to know to increase wager or fold.
<br />

**2. Guarantees on routing of information between parties** <br />
The terms of service, the auditing by government, and the enforcement of law by the company's operating jurisdiction is the only guarantee you get that your actions to up a bet, match wager, or fold is actually carried out. Again, if you don't know or trust the brand/company, it's likely you won't feel the game is fair. 

Another common complaint of online poker is that the game lags or fails to record your action and folds your hand or matches your wager when you didn't want it to.
<br />

**3. Multiparty computation attacks: timeout and denial of service** <br />
These attacks currently have no mitigation
- if the online poker site shuts down, then you have no mitigation
- if the opponent rage quits, then you have no mitigation
- if players collude, you have no mitigation or recourse

These are the last most common complaints of an online poker game -- opponents will rage quit or the online poker service may fail/shut down mid game.

<br />

## How Where's Alex solves the issues with multiparty privacy

<br />

**1. Guarantees on privacy of data** <br />
In private/public ZKP blockchains like Aleo, your data is guaranteed to be private to other players in the game as long as they don't have your private keys and that the smart contract/program functions don't reveal your data to others.

This alleviates the concern that the game is rigged because you have guarantees your information is hidden from other players/house and you can verify yourself onchain.

<br />

**2. Guarantees on routing of information between parties** <br />
Puzzle's SDK has operations to CreateSharedState and ImportSharedState that work with Puzzle Wallet to create multisig keys and import multisig keys for generating a place to send information to parties in a game.
In private/public ZKP blockchains like Aleo, your information is recorded onchain and guaranteed to be available to anyone that runs or communicates with a node.
Additionally, Puzzle wallet makes it easy for you to find your game state that's recorded on chain.

<br />

This alleviates the concern that your actions will be carried out and reach the other parties -- you can verify that it has been processed on chain.

<br />

**3. Multiparty computation attacks: timeout and denial of service** <br />
The secret sauce of Where's Alex is solving the rage-quit, colllusion and denial of service problem with incentive engineering and game design.

<br />

This is done by forcing a challenger to commit a wager to a 2/2 multisig between the challenger & opponent when proposing a game.
Once the opponent accepts the game and submits their guess -- the challenger's wager is locked and will be lost if the challenger rage quits or never reveals the answer.
Importantly -- thanks to programmability of the multisig -- there are exit routes the challenger can take to retrieve their funds from the multisig if the opponent rejects or never responds so it's not stuck at the beginning as well.
Because the game is a simple 1v1 -- we also don't have to worry about the collusion risk as well.

<br />

# How Where's Alex works

<br />

Below we'll walk through the following:
1. How the Where's Alex? game works at a high level with Leo programs, Puzzle Wallet, and Puzzle SDK
2. How the Where's Alex? Leo programs work in depth


## High level overview of Where's Alex Leo program on Aleo

<br />

<img width="792" alt="image" src="https://github.com/puzzlehq/serengeti/assets/39972641/b5c0f35c-a91f-4b9d-a233-3191ddbc8265">


NOTE: Different function executions require different keys (player 1, player 2, multisig keys). For testing purposes, you can run the below to switch execution keys.

<br /><br />

We also have a `test.sh` script [here](./wheres_alex_vXXX/test.sh) that runs through all the flows.

```
echo "
NETWORK=testnet3
PRIVATE_KEY={MS_PK || P1_PK | P2_PK}
" > .env
```

<br />

## High level overview of Where's Alex with the Puzzle Wallet and Puzzle SDK

<br />

<img width="757" alt="image" src="https://github.com/puzzlehq/serengeti/assets/39972641/74b3a692-3b80-4c40-90b6-44307d9a4c1e">

More information on the Puzzle Wallet and Puzzle SDK can be found [here](https://docs.puzzle.online/)

<br />

# Walking through the Where's Alex Leo programs

Repo [here](https://github.com/puzzlehq/wheres_alex/tree/main/program)
