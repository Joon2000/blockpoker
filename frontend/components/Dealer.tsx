import React, { useState } from "react"
import { Cards } from "./Cards"

const Dealer = ({
  turn,
  setTurn,
  choice,
  setChoice,
  dealerCoin,
  setDealerCoin,
  coin,
  addCard,
}) => {
  const [dealerCards, setDealerCards] = useState<string[]>(["", "", ""])
  return (
    <div>
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
