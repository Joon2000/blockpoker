import { Grid, Box, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { CardBack } from "./CardBack"
import { TrumpCard } from "./TrumpCard"
import { Card } from "src/declarations/poker/poker.did"

const PlayerCards = ({
  player,
  playerCrpytoNumber,
}) => {
  

  return (
    <Box>
      <Grid container spacing={0}>
        {player!=null &&
        player.cards.map((card : Card, index: React.Key) => (
            <Grid item xs={4} key={index}>
              <TrumpCard 
              cardNumber={ Number(card.cardNumber)}
              order={card.order}
              playerCrpytoNumber={playerCrpytoNumber}/>
            </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export { PlayerCards }
