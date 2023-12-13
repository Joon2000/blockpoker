import { Grid, Box, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { CardBack } from "./CardBack"
import { TrumpCard } from "./TrumpCard"
import { Card } from "src/declarations/poker/poker.did"

const PlayerCards = ({
  playerInfo,
}) => {

  return (
    <Box>
      <Grid container spacing={0}>
        {playerInfo!=null &&
        playerInfo.cards.map((card : Card, index: React.Key) => (
            <Grid item xs={4} key={index}>
              <TrumpCard cardNumber={ Number(card.cardNumber)} />
            </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export { PlayerCards }
