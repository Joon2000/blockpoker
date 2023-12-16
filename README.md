# Blockpoker

---

## **Introduction**

---

Blockpoker is a blockchain real-time multiplayer poker game. It accommodates up to 4 players and provides a completely on-chain gaming experience, ensuring that players can engage in the game securely without the possibility of cheating. Despite being an on-chain game where one might expect visibility into all card hands, encryption techniques are employed. This allows players to know only their own cards while remaining unaware of the cards held by other players.

<img src="/blockpoker_image.png" width="700" height="680">

## How to Play Game

---

### Game Entry

Connect Wallet → Enter Game → Ready Game → Start Game(only master player)

### Game Start

Play Game(Call, Raise, Fold, Draw Card) → Stop Game

### Settle Up

Settle up

## Components

---

### gameStatus

I created a component to store essential game progress information in **`gameStatus`**. This component is designed for quick retrieval through a query function from the asset canister.

### gameTable

- players
    - When a player enters the game, they are added to the 'players' component. Think of it as a seat reserved for the player
- cardDeck
    - This is a component that gathers cards for a poker game. Initially empty, when the 'Start Game' button is pressed, new cards are generated. All cards are initially encrypted by a backend key. When dealing cards to a player, they are decrypted and then re-encrypted with the player's key before being handed over.
- usedCardDeck
    - A card deck that gathers used cards.
- moneyBox
    - A box for collecting poker chips that players have bet.
- chipExchange
    - A component where players can exchange ICP for poker chips, while also storing the player's poker chips.
- cryptoNum (나중에 vet key로 대체 됨)
    - A component that stores the player key. It will be phased out in the future with the application of vetting keys

## Game Logic

---

### connect wallet

### enter game

### ready game

### start game

### play game

Currently, poker game logic is not applied, and the game proceeds based on the rule that the player with the highest sum of card numbers wins.

- call
- raise
- fold

### stop game

### settle up

< 게임 로직 이미지>

## Roadmap

- [x]  develop blockpoker asset canister
- [x]  develop blockpoker backend canister
- [x]  develop random shuffle card function
- [x]  develop betting function
- [ ]  upgrade asset css
- [ ]  devleop poker game logic
- [ ]  apply vet-key or identity based encryption
- [ ]  apply ICP transfer to exchange whit poker chips

## License

MIT License

Copyright (c) 2023 blockpoker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.