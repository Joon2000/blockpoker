import { Grid } from "@mui/material"
import React from "react"
import { CardBack } from "./CardBack"
import { NumberCard } from "./NumberCard"

const PlayerCards = ({ playerCards }) => {
  return (
    <div style={{ position: "absolute", left: "32%", top: "380px" }}>
      <Grid container spacing={4}>
        {playerCards.map((card: number, index: React.Key) => {
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

export { PlayerCards }
