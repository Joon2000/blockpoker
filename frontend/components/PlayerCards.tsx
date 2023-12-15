import { Grid, Box, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { CardBack } from "./CardBack"
import { TrumpCard } from "./TrumpCard"
import { Card } from "src/declarations/poker/poker.did"
import { blue, brown, pink } from "@mui/material/colors"

const PlayerCards = ({
  player,
  gameTurn,
  currentPlayerCrpytoNumber,
}) => {

  return (
    <Box 
    sx={{bgcolor: player!=null && player.playerOrder.toString() == gameTurn.toString() ? blue[200] : pink[200]}}
    >
      <Grid container spacing={0}>
        {player!=null &&<Typography>{player.address.toString()}</Typography>}
        {player!=null &&<Typography>{Object.keys(player.bettingAction)[0].toString()}</Typography>}
        {player!=null &&
        player.cards.map((card : Card, index: React.Key) => (
            <Grid item xs={1} key={index}>
              <TrumpCard 
              cardNumber={ Number(card.cardNumber)}
              order={card.order}
              currentPlayerCrpytoNumber={currentPlayerCrpytoNumber}
              />
              
            </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export { PlayerCards }
