import React, { useState, useEffect } from "react"
import { Cards } from "./Cards"
import { getDealerChoice } from "../temp/getDealerChoice"

const Dealer = ({
  dealerCards,
  setDealerCards,
  turn,
  setTurn,
  dealerChoice,
  setDealerChoice,
  playerChoice,
  dealerCoin,
  setDealerCoin,
  dealerBet,
  setDealerBet,
  playerBet,
  playerCoin,
  addCard,
  callState,
  setCallState,
  round,
  setRound,
  setEndGame,
  dealerTotalBet,
  playerTotalBet,
  setDealerTotalBet,
}) => {
  useEffect(() => {
    setDealerTotalBet(
      (prevTotalDealerBet: number) => prevTotalDealerBet + dealerBet,
    )
  }, [dealerBet])
  useEffect(() => {
    if (turn === "DEALER" && round === "ROUND1") {
      const choice = getDealerChoice(playerChoice)
      if (choice === "CALL") {
        setDealerCoin(
          (prevCoin: number) => prevCoin - (playerTotalBet - dealerTotalBet),
        )
        setDealerBet(playerTotalBet - dealerTotalBet)
        if (dealerChoice === "CALL") {
          setCallState(true)
        }
      } else if (choice === "RAISE") {
        let betCoin: number
        if (playerChoice === "RAISE") {
          betCoin = playerBet * 2 + playerBet - dealerBet
        } else if (playerChoice === "CALL") {
          betCoin = dealerBet * 2 + playerBet - dealerBet
        } else {
          betCoin = playerBet * 2 + playerBet - dealerBet
        }
        //돈을 canister로 옮기는 함수
        setDealerCoin((prevCoin: number) => prevCoin - betCoin)
        setDealerBet(betCoin)
        setTurn("PLAYER")
      } else if (choice === "FOLD") {
        setEndGame(true)
      }
      console.log(choice)
      setDealerChoice(choice)
      setTurn("PLAYER")
    }
  }, [turn])

  return (
    <div>
      <div>
        dealer coin: {dealerCoin} dealer total bet: {dealerTotalBet} dealer bet:
        {dealerBet}
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
