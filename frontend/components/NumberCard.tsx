import React from "react"
import card1 from "../assets/1_of_spades.png"
import card2 from "../assets/2_of_spades.png"
import card3 from "../assets/3_of_spades.png"
import card4 from "../assets/4_of_spades.png"
import card5 from "../assets/5_of_spades.png"
import card6 from "../assets/6_of_spades.png"
import card7 from "../assets/7_of_spades.png"
import card8 from "../assets/8_of_spades.png"
import card9 from "../assets/9_of_spades.png"
import card10 from "../assets/10_of_spades.png"

const NumberCard = ({ number }) => {
  const cards = [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
  ]
  return (
    <div>
      <img
        src={cards[number - 1]}
        alt={`${number.toString()}_of_spades.png`}
        className="card--image"
      />
    </div>
  )
}

export { NumberCard }
