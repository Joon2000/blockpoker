import React, { useState } from "react"

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
  const [dealerCard, setDealerCard] = useState<string[]>(["", "", ""])
  return <div>dealer</div>
}

export { Dealer }
