import { Grid, Box, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { TrumpCard } from "./TrumpCard"
import { Card } from "src/declarations/poker/poker.did"
import { blue, brown, grey, pink } from "@mui/material/colors"

const PlayerCards = ({
  player,
  wallet,
  gameTurn,
  currentPlayerCrpytoNumber,
}) => {

  return (
    <Box 
    sx={{
      bgcolor: player!=null && player.address.toString() == wallet.principal.toString() ? pink[200] : blue[100],
      border: player!=null && player.playerOrder.toString() == gameTurn.toString() ? 3 : 0,
    }}
    >
      {player!=null &&<Typography variant="caption">{player.address.toString()}</Typography>}
      {player!=null &&<Typography>{Object.keys(player.bettingAction)[0].toString()}</Typography>}
      {player!=null &&<Typography>currentChips : {player.currentChips.toString()}</Typography>}
      {player!=null &&<Typography>currentBetAmount : {player.currentBetAmount.toString()}</Typography>}
      <Grid container spacing={0}>
        
        {player!=null &&
        player.cards.map((card : Card, index: React.Key) => (
            <Grid item xs={2} key={index}>
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
