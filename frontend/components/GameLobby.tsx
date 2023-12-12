import React, { useEffect, useState } from "react"
import { Box, Button, Grid } from "@mui/material"
import { brown } from "@mui/material/colors"
import { StateBoxRefactor } from "./StateBoxRefactor"
import { MoneyBoxRefactor } from "./MoneyBoxRefactor"
import { CounterpartCardsRefactor } from "./CounterpartCardsRefactor"
import { PlayerCardsRefactor } from "./PlayerCardsRefactor"
import { CardDeck } from "./CardDeck"
import { Message } from "./Message"
import { ParticipationStatusCard } from "./ParticipationStatusCard"
import { poker} from "../../src/declarations/poker"
import { Principal } from "@dfinity/principal"
import { Typography } from '@mui/material';


const GameLobby = ({
  wallet,
  playerInfo,
  playerInfoArray,
  masterPlayer,
  playingState
}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  // const [playerPlayingState, setPlayerPlayingState] = useState<string>("");

  // useEffect(()=>{
  //   setPlayerPlayingState(playerInfo!=null&&Object.keys(playerInfo.playingState)[0])
  // },[playerInfo])

  async function enterGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.enterGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);

    console.log("Game enterGame")
  };

  async function readyGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.readyGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);

    console.log("Game readyGame")
  };

  async function startGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    try {
      await poker.startGame(Principal.fromText(wallet.principal));
    } catch (err){
      console.log(err)
    };
    
    setIsButtonDisabled(false);

    console.log("Game startGame")
  };

  return (
      <Box
        sx={{
          // width: 950,
          // height: 500,
          // borderRadius: 1,
          bgcolor: brown[200],
          pb: 5,
        }}
      >
        <Box sx={{}}>
          <Typography> Here Is GameLobby</Typography>
          {playerInfo == null ? <p>not yet enter game</p> : <p>player : {playerInfo.address.toString()}</p>}

          <Grid container spacing={2}>
            {playerInfoArray.map((player)=>(
              <Grid item xs={6} md={4} lg={3} key={player.address.toString()}>
                <ParticipationStatusCard playerPrinciple={player.address.toString()}/>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ml:2, mt: 5}}>
          {playerInfo == null ? 
          <Button
              variant="contained"
              onClick={enterGame}
              size="large"
              color="primary"
              disabled={isButtonDisabled}
            > Enter Game </Button>
            :
            <Button
              variant="contained"
              onClick={readyGame}
              size="large"
              color="error"
              disabled={isButtonDisabled}
            > Ready Game </Button>
          }
          {playerInfo!=null && playingState=="ALL_READY" && masterPlayer==wallet.principal.toString()&&
            <Button
              variant="contained"
              onClick={startGame}
              size="large"
              color="error"
              disabled={isButtonDisabled}
            >
              Start Game
            </Button> 
          }
        </Box>

        
        
        
      </Box>
  )
}

export { GameLobby }
