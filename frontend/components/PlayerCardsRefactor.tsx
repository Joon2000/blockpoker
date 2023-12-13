import { Grid, Box } from "@mui/material"
import React from "react"
import { CardBack } from "./CardBack"
import { NumberCard } from "./NumberCard"

const PlayerCardsRefactor = (
  // { playerCards }
  ) => {
  return (
    <Box>
      <Grid container spacing={4}>
            <Grid item xs={6} md={4} key={"12"}>
              {<NumberCard number={1} />}
            </Grid> 
        {/* {playerCards.map((card: number, index: React.Key) => {
          return (
            <Grid item xs={6} md={4} key={index}>
              {card ? <NumberCard number={card} /> : <CardBack />}
            </Grid>
          )
        })} */}
      </Grid>
    </Box>
  )
}

export { PlayerCardsRefactor }
