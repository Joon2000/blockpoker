import React, { useEffect, useState } from "react"
import { CardBack } from "./CardBack"
import { Grid } from "@mui/material"
import { Turn } from "../../src/declarations/Turn"
import { TrumpCard } from "./TrumpCard"

const CounterpartCardsRefactor = ({ 
  // gameTurn, 
  wallet 
}) => {
  const [counterpartCards, setCounterpartCards] = useState<number[]>([0, 0, 0])

  const fetchCounterpartCards = async () => {
    const cards = await Turn.getCounterpartCards(wallet.principal)
    setCounterpartCards([Number(cards[0]), Number(cards[1]), Number(cards[2])])
  }

  return (
      <Grid container spacing={4}>
        {counterpartCards.map((card: number, index: React.Key) => {
          return (
            <Grid item xs={4} key={index}>
              {card ? <TrumpCard number={card} /> : <CardBack />}
            </Grid>
          )
        })}
      </Grid>
  )
}

export { CounterpartCardsRefactor }
