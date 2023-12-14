import { Grid, Box } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"
import { StateBoxRefactor } from "./StateBoxRefactor"
import { MoneyBoxRefactor } from "./MoneyBoxRefactor"
import { PlayerCards } from "./PlayerCards"
import { CardDeck } from "./CardDeck"

const PokerTable = ({
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
      <Grid container spacing={5} id={"Top Line"}>
        <Grid item xs={4}>

        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+2)%4]!=null &&
          <PlayerCards 
            wallet={wallet}
            player={playerInfoArray[(Number(playerInfo.playerOrder)+2)%4]}
          />}
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>
      <Grid container spacing={5} id={"Middle Line"}>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+3)%4]!=null &&
          <PlayerCards 
            wallet={wallet}
            player={playerInfoArray[(Number(playerInfo.playerOrder)+3)%4]}
          />}
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <MoneyBoxRefactor />
            <CardDeck />   
          </Box>
                 
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+1)%4]!=null &&
          <PlayerCards 
            wallet={wallet}
            player={playerInfoArray[(Number(playerInfo.playerOrder)+1)%4]}
          />}
        </Grid>
      </Grid>
      <Grid container spacing={5} id={"Bottom Line"}>
        <Grid item xs={4}>

        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+0)%4]!=null &&
            <PlayerCards 
            wallet={wallet}
            player={playerInfoArray[Number(playerInfo.playerOrder)%4]}
            />
          }
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <StateBoxRefactor/>
        </Grid>
      </Grid>
    </Box>
  )
}

export { PokerTable }
