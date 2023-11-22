import React, { useState } from "react"
import { Coin } from "./Coin"
import { EnteranceFee } from "./EnteranceFee"
import { Cards } from "./Cards"
import { Choice } from "./Choice"

const Player = ({
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
  const [payEnteranceFee, setPayEnteranceFee] = useState<boolean>(false)
  const [cards, setCards] = useState<string[]>(["", "", ""])
  return (
    <div>
      <Coin coin={coin} />
      {!payEnteranceFee ? (
        <EnteranceFee setPayEnteranceFee={setPayEnteranceFee} />
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
