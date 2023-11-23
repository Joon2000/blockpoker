import React, { useState } from "react"
import { Coin } from "./Coin"
import { EnteranceFee } from "./EnteranceFee"
import { Cards } from "./Cards"
import { Choice } from "./Choice"

const Player = ({
  cards,
  setCards,
  turn,
  setTurn,
  dealerCoin,
  coin,
  setCoin,
  playerBet,
  setPlayerBet,
  dealerBet,
  addCard,
  setAddCard,
  choice,
  setChoice,
  callState,
  setCallState,
  round,
  setRound,
  setEndGame,
}) => {
  return (
    <div>
      <Coin coin={coin} playerBet={playerBet} />
      {turn === "ENTERING" ? (
        <EnteranceFee
          setTurn={setTurn}
          setCoin={setCoin}
          setPlayerBet={setPlayerBet}
        />
      ) : (
        <div>
          <Cards cards={cards} addCard={addCard} />
          <Choice
            turn={turn}
            setTurn={setTurn}
            dealerCoin={dealerCoin}
            coin={coin}
            playerBet={playerBet}
            setPlayerBet={setPlayerBet}
            dealerBet={dealerBet}
            choice={choice}
            setCoin={setCoin}
            setCards={setCards}
            setChoice={setChoice}
            setAddCard={setAddCard}
            callState={callState}
            setCallState={setCallState}
            round={round}
            setRound={setRound}
          />
        </div>
      )}
    </div>
  )
}

export { Player }
