import React from "react"

const Coin = ({ coin, payed }) => {
  return (
    <div>
      Coin: {coin} Bet: {payed}
    </div>
  )
}

export { Coin }
