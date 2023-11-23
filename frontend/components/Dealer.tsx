import React, { useState } from "react"
import { Cards } from "./Cards"
import { getDealerChoice } from "../temp/getDealerChoice"

const Dealer = ({
  dealerCards,
  setDealerCards,
  turn,
  setTurn,
  choice,
  setChoice,
  dealerCoin,
  setDealerCoin,
  dealerBet,
  setDealerBet,
  playerBet,
  coin,
  addCard,
  callState,
  setCallState,
  round,
  setRound,
  setEndGame,
}) => {
  if (turn === "DEALER") {
    if (round === "ROUND1") {
      if (choice === "NONE") {
        console.log("here")
        setChoice(getDealerChoice(choice))
      } else if (true) {
      } else {
      }

      //after choice
      if (choice === "CALL") {
        setDealerBet(playerBet)
        setDealerCoin((prevCoin: number) => prevCoin - dealerBet)
        setCallState((prevCallState: CallState[]) => [prevCallState[0], "CALL"])
      } else if (choice === "Raise") {
        setDealerCoin(
          (prevCoin: number) => prevCoin - (playerBet * 2 - dealerBet),
        )
        setDealerBet(playerBet * 2)
      } else if (choice === "FOLD") {
        setEndGame(true)
      }
      console.log(`dealer: ${choice} `)
      setTurn("PLAYER")
    }
  }
  return (
    <div>
      <div>
        dealer coin: {dealerCoin} dealer bet: {dealerBet}
      </div>
      {addCard ? (
        <div>
          <div>Card1</div>
          <div>Card2</div>
          <div>Card3</div>
        </div>
      ) : (
        <div>
          <div>Card1</div>
          <div>Card2</div>
        </div>
      )}
    </div>
  )
}

export { Dealer }
