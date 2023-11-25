import React, { useEffect } from "react"
import { Choice } from "frontend/Type"

const Select = ({
  turn,
  setTurn,
  dealerCoin,
  playerCoin,
  playerBet,
  setPlayerBet,
  dealerBet,
  dealerChoice,
  setPlayerCoin,
  setPlayerCards,
  setPlayerChoice,
  setAddCard,
  callState,
  setCallState,
  round,
  setRound,
  setEndGame,
  playerTotalBet,
  dealerTotalBet,
  setPlayerTotalBet,
  setWinner,
}) => {
  function clickFold(e: { preventDefault: () => void }) {
    e.preventDefault()
    setPlayerChoice("FOLD")
    setWinner("DEALER")
    setEndGame(true)
  }

  function clickCall(e: { preventDefault: () => void }) {
    e.preventDefault()
    setPlayerChoice("CALL")
    const betCoin = dealerTotalBet - playerTotalBet
    //돈을 canister로 옮기는 함수
    setPlayerCoin((prevCoin: number) => prevCoin - betCoin)
    setPlayerBet(betCoin)
    setPlayerTotalBet(
      (prevTotalPlayerBet: number) => prevTotalPlayerBet + betCoin,
    )
    if (dealerChoice === "CALL") {
      setCallState(true)
    }
    setTurn("DEALER")
  }

  // function clickCheck(e: { preventDefault: () => void }) {
  //   e.preventDefault()
  //   setPlayerChoice("CHECK")
  //   setTurn("DEALER")
  // }

  function clickRaise(e: { preventDefault: () => void }) {
    e.preventDefault()
    setPlayerChoice("RAiSE")
    let betCoin: number
    if (dealerChoice === "RAISE") {
      betCoin = dealerBet * 2 + dealerBet - playerBet
    } else if (dealerChoice === "CALL" || dealerChoice === "NONE") {
      if (playerBet === 1) {
        betCoin = 2
      } else {
        betCoin = playerBet * 2 + dealerBet - playerBet
      }
    }
    //돈을 canister로 옮기는 함수
    setPlayerCoin((prevCoin: number) => prevCoin - betCoin)
    setPlayerBet(betCoin)
    setPlayerTotalBet(
      (prevTotalPlayerBet: number) => prevTotalPlayerBet + betCoin,
    )
    setTurn("DEALER")
  }

  return (
    <div>
      {turn === "PLAYER" ? (
        <div>
          <div>
            <button onClick={clickFold}>Fold</button>
          </div>
          <div>
            <button onClick={clickCall}>Call</button>
          </div>
          {/* <div>
            {dealerChoice === "CHECK" || dealerChoice === "NONE" ? (
              <button onClick={clickCheck}>Check</button>
            ) : (
              <button onClick={null}>Check</button>
            )}
          </div> */}

          <div>
            <button onClick={clickRaise}>Raise</button>
          </div>
        </div>
      ) : (
        <div>Progressing</div>
      )}
    </div>
  )
}

export { Select }
