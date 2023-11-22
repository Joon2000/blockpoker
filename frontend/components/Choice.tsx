import React from "react"

const Choice = ({
  turn,
  setTurn,
  dealerCoin,
  coin,
  choice,
  setCoin,
  setCards,
  setChoice,
  setAddCard,
}) => {
  function clickCall(e: { preventDefault: () => void }) {
    e.preventDefault()
    setChoice("CALL")
    const newCard = "7"
    setCards((prev: string[]) => [prev[0], prev[1], newCard])
    setAddCard(true)
    const payCoin = dealerCoin - coin
    //돈을 canister로 옮기는 함수
    setCoin(dealerCoin)
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
    setCoin(dealerCoin * 2)
    const payCoin = dealerCoin - coin
    //돈을 canister로 옮기는 함수
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
