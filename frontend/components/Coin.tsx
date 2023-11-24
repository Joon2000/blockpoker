import React from "react"

const Coin = ({ playerCoin, playerBet, playerTotalBet }) => {
  return (
    <div>
      coin: {playerCoin} totalbet: {playerTotalBet} bet: {playerBet}
    </div>
  )
}

export { Coin }
