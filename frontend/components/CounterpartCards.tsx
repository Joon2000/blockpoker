import React, { useEffect, useState } from "react"
import { CardBack } from "./CardBack"
import { Grid } from "@mui/material"
import { Turn } from "../../src/declarations/Turn"
import { NumberCard } from "./NumberCard"

const CounterpartCards = ({ gameTurn, wallet }) => {
  const [counterpartCards, setCounterpartCards] = useState<number[]>([0, 0, 0])

  const fetchCounterpartCards = async () => {
    const cards = await Turn.getCounterpartCards(wallet.principal)
    setCounterpartCards([Number(cards[0]), Number(cards[1]), Number(cards[2])])
  }

  useEffect(() => {
    if (gameTurn === "END") {
      fetchCounterpartCards()
    } else {
      setCounterpartCards([0, 0, 0])
    }
  }, [gameTurn])

  return (
    <div style={{ position: "absolute", left: "32%", top: "10px" }}>
      <Grid container spacing={4}>
        {counterpartCards.map((card: number, index: React.Key) => {
          return (
            <Grid item xs={6} md={4} key={index}>
              {card ? <NumberCard number={card} /> : <CardBack />}
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export { CounterpartCards }
