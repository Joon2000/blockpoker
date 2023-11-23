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
  addCard,
  setAddCard,
  choice,
  setChoice,
}) => {
  return (
    <div>
      <Coin coin={coin} />
      {turn === "ENTERING" ? (
        <EnteranceFee setTurn={setTurn} />
      ) : (
        <div>
          <Cards cards={cards} addCard={addCard} />
          <Choice
            turn={turn}
            setTurn={setTurn}
            dealerCoin={dealerCoin}
            coin={coin}
            choice={choice}
            setCoin={setCoin}
            setCards={setCards}
            setChoice={setChoice}
            setAddCard={setAddCard}
          />
        </div>
      )}
    </div>
  )
}

export { Player }
