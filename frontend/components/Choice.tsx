import React from "react"

const Choice = ({
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
}) => {
  function clickFold(e: { preventDefault: () => void }) {
    e.preventDefault()
    setPlayerChoice("FOLD")
    setEndGame(true)
  }

  function clickCall(e: { preventDefault: () => void }) {
    e.preventDefault()
    setPlayerChoice("CALL")
    setCallState((prevCallState: CallState) => ["CALL", prevCallState[1]])
    const betCoin = dealerBet - playerBet
    //돈을 canister로 옮기는 함수
    setPlayerCoin((prevCoin: number) => prevCoin - (dealerBet - playerBet))
    setPlayerBet(betCoin)
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
      betCoin = (dealerBet - playerBet) * 3
      setPlayerCoin((prevCoin: number) => prevCoin - betCoin)
    } else if (dealerChoice === "CALL") {
      betCoin = playerBet
      setPlayerCoin((prevCoin: number) => prevCoin - betCoin)
    }
    //돈을 canister로 옮기는 함수
    setPlayerBet(betCoin)
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

export { Choice }
