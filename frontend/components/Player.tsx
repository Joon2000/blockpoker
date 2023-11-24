import React, { useEffect, useState } from "react"
import { Coin } from "./Coin"
import { EnteranceFee } from "./EnteranceFee"
import { Cards } from "./Cards"
import { Choice } from "./Choice"

const Player = ({
  playerCards,
  setPlayerCards,
  turn,
  setTurn,
  dealerCoin,
  playerCoin,
  setPlayerCoin,
  playerBet,
  setPlayerBet,
  dealerBet,
  addCard,
  setAddCard,
  playerChoice,
  setPlayerChoice,
  dealerChoice,
  callState,
  setCallState,
  round,
  setRound,
  setEndGame,
  playerTotalBet,
  dealerTotalBet,
  setPlayerTotalBet,
}) => {
  return (
    <div>
      <Coin
        playerCoin={playerCoin}
        playerBet={playerBet}
        playerTotalBet={playerTotalBet}
      />
      {turn === "ENTERING" ? (
        <EnteranceFee
          setTurn={setTurn}
          setCoin={setPlayerCoin}
          setPlayerBet={setPlayerBet}
          setPlayerTotalBet={setPlayerTotalBet}
        />
      ) : (
        <div>
          <Cards playerCards={playerCards} addCard={addCard} />
          <Choice
            turn={turn}
            setTurn={setTurn}
            dealerCoin={dealerCoin}
            playerCoin={playerCoin}
            playerBet={playerBet}
            setPlayerBet={setPlayerBet}
            dealerBet={dealerBet}
            dealerChoice={dealerChoice}
            setPlayerCoin={setPlayerCoin}
            setPlayerCards={setPlayerCards}
            setPlayerChoice={setPlayerChoice}
            setAddCard={setAddCard}
            callState={callState}
            setCallState={setCallState}
            round={round}
            setRound={setRound}
            setEndGame={setEndGame}
            playerTotalBet={playerTotalBet}
            dealerTotalBet={dealerTotalBet}
            setPlayerTotalBet={setPlayerTotalBet}
          />
        </div>
      )}
    </div>
  )
}

export { Player }
