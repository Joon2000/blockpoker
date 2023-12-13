import { Grid, Box } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"
import { StateBoxRefactor } from "./StateBoxRefactor"
import { MoneyBoxRefactor } from "./MoneyBoxRefactor"
import { CounterpartCardsRefactor } from "./CounterpartCardsRefactor"
import { PlayerCards } from "./PlayerCards"
import { CardDeck } from "./CardDeck"
import { Message } from "./Message"

const PokerTableRefactor = ({
  wallet,
  playerInfo,
  playerInfoArray,
  updateState,
}) => {

  return (
    <Box
      sx={{
        // width: 950,
        height: 550,
        borderRadius: 1,
        bgcolor: brown[200],
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <CounterpartCardsRefactor 
            wallet={wallet} 
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <CounterpartCardsRefactor 
            wallet={wallet} 
          />
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <MoneyBoxRefactor />
            <CardDeck />   
          </Box>
                 
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <CounterpartCardsRefactor 
          wallet={wallet} 
          /> 
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>

        </Grid>
        <Grid item xs={4}>
          <PlayerCards 
          playerInfo={playerInfo}
          />
        </Grid>
        <Grid item xs={4}>
          <StateBoxRefactor/>
        </Grid>
      </Grid>
    </Box>
  )
}

export { PokerTableRefactor }
