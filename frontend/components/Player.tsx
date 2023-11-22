import React, { useState } from "react"

const Player = () => {
  const [payEnteranceFee, setPayEnteranceFee] = useState<boolean>(false)
  const [coin, setCoin] = useState(0)
  return (
    <div>
      <Coin />
      {!payEnteranceFee ? (
        <EnteranceFee />
      ) : (
        <div>
          <Cards />
          <Choice />
        </div>
      )}
    </div>
  )
}

export { Player }
