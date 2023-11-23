import React from "react"

const Choice = ({
  turn,
  setTurn,
  dealerCoin,
  coin,
  playerBet,
  setPlayerBet,
  dealerBet,
  choice,
  setCoin,
  setCards,
  setChoice,
  setAddCard,
  callState,
  setCallState,
  round,
  setRound,
}) => {
  function clickCall(e: { preventDefault: () => void }) {
    e.preventDefault()
    setChoice("CALL")
    const newCard = "7"
    setCards((prevCard: string[]) => [prevCard[0], prevCard[1], newCard])
    setAddCard(true)
    const payCoin = dealerCoin - coin
    //돈을 canister로 옮기는 함수
    setCoin((prevCoin: number) => prevCoin - bet)
    setTurn("DEALER")
  }

  function clickCheck(e: { preventDefault: () => void }) {
    e.preventDefault()
    setChoice("CHECK")
    setTurn("DEALER")
  }

  function clickRaise(e: { preventDefault: () => void }) {
    e.preventDefault()
    setChoice("RAiSE")
    const paycoin = bet
    //돈을 canister로 옮기는 함수
    setBet((prevBet: number) => prevBet * 2)
    setCoin((prevCoin: number) => prevCoin - bet)
    setTurn("DEALER")
  }

  return (
    <div>
      {turn === "PLAYER" ? (
        <div>
          <div>
            <button onClick={clickCall}>Call</button>
          </div>
          <div>
            {choice === "CHECK" || choice === "NONE" ? (
              <button onClick={clickCheck}>Check</button>
            ) : (
              <button onClick={null}>Check</button>
            )}
          </div>
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
