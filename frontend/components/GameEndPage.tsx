import { Grid, Box, Button } from "@mui/material"
import { brown } from "@mui/material/colors"
import React , { useState } from "react"
import { StateBox } from "./StateBox"
import { MoneyBox } from "./MoneyBox"
import { PlayerCards } from "./PlayerCards"
import { CardDeck } from "./CardDeck"
import { poker} from "../../src/declarations/poker"

const GameEndPage = ({
  wallet,
  gameTurn,
  totalBetAmount,
  playerInfo,
  playerInfoArray,
  playerCrpytoNumber,
  updateState,
}) => { 
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  async function settleUp(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.settleUpGame();
    setIsButtonDisabled(false);
    updateState();

    console.log("settle up game")
  };


  return (
    <Box
      sx={{
        // width: 950,
        minHeight: 550,
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
            player={playerInfoArray[(Number(playerInfo.playerOrder)+2)%4]}
            gameTurn={gameTurn}
            currentPlayerCrpytoNumber={0}
          />}
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>
      <Grid container spacing={5} id={"Middle Line"}>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+3)%4]!=null &&
          <PlayerCards 
            player={playerInfoArray[(Number(playerInfo.playerOrder)+3)%4]}
            gameTurn={gameTurn}
            currentPlayerCrpytoNumber={0}
          />}
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <MoneyBox totalBetAmount={totalBetAmount}/>
            <CardDeck />   
          </Box>
                 
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+1)%4]!=null &&
          <PlayerCards 
            player={playerInfoArray[(Number(playerInfo.playerOrder)+1)%4]}
            gameTurn={gameTurn}
            currentPlayerCrpytoNumber={0}
          />}
        </Grid>
      </Grid>
      <Grid container spacing={5} id={"Bottom Line"}>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && <StateBox playerInfo={playerInfo}/>}
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+0)%4]!=null &&
            <PlayerCards 
            player={playerInfoArray[Number(playerInfo.playerOrder)%4]}
            gameTurn={gameTurn}
            currentPlayerCrpytoNumber={playerCrpytoNumber}
            />
          }
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
         <Button
            variant="contained"
            onClick={settleUp}
            size="large"
            color="primary"
            disabled={isButtonDisabled}
          > Setlle Up </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export { GameEndPage }
