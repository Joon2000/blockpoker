import React from "react"
import cardBack from "../assets/pngegg.png"

const CardBack = () => {
  return (
    <div>
      <img src={cardBack} alt="card_back" className="card--image" />
    </div>
  )
}

export { CardBack }
