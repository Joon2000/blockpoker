import { Grid, Box, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { CardBack } from "./CardBack"
import { TrumpCard } from "./TrumpCard"
import { Card } from "src/declarations/poker/poker.did"
import { blue, brown, pink } from "@mui/material/colors"

const PlayerCards = ({
  player,
  gameTurn,
  playerCrpytoNumber,
}) => {

  return (
    <Box 
    sx={{bgcolor: player!=null && player.playerOrder.toString() == gameTurn.toString() ? blue[200] : pink[200]}}
    >
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
