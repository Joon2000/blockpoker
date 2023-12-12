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
  masterPlayer
}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [playerPlayingState, setPlayerPlayingState] = useState<string>("");

  useEffect(()=>{
    setPlayerPlayingState(playerInfo!=null&&Object.keys(playerInfo.playingState)[0])
    // console.log(playerInfo!=null&&Object.keys(playerInfo.playingState)[0])
    // console.log(playerInfo!=null&&playerInfo.betAmount)
    // console.log("playerPlayingState", playerPlayingState)
    // console.log(playerInfoArray[0])
    // console.log( playerInfo!=null&&masterPlayer==playerInfo.address.toString())
  },[playerInfo])

  async function enterGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.enterGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);

    console.log("Game enterGame")
  };

  async function exitGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.exitGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);

    console.log("Exit Game")
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
    await poker.startGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);

    console.log("Game startGame")
  };

  return (
      <Box
        sx={{
          // width: 950,
          height: 550,
          // borderRadius: 1,
          bgcolor: brown[200],
          // pb: 10,
        }}
      >
        <Box sx={{pd:10}}>
          <Typography> Here Is GameLobby</Typography>
          {playerInfo == null ? <p>not yet enter game</p> : <p>player : {playerInfo.address.toString()}</p>}
            <Grid container spacing={2}>
            {playerInfoArray.map((player)=>(
              <Grid item xs={6} md={4} lg={3} key={player.address.toString()}><ParticipationStatusCard playerPrinciple={player.address.toString()}/></Grid>
            ))}
          </Grid>
        </Box>
        <Box>
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
              onClick={exitGame}
              size="large"
              color="error"
              disabled={isButtonDisabled}
            > Exit Game </Button>
          }
          {
            {
              "ENTER" : 
              <Button
                variant="contained"
                onClick={readyGame}
                size="large"
                color="warning"
                disabled={isButtonDisabled}
              >
                Ready Game
              </Button>
              ,"READY" :
              playerInfo!=null && masterPlayer==playerInfo.address.toString() 
              &&
              <Button
                variant="contained"
                onClick={startGame}
                size="large"
                color="error"
                disabled={isButtonDisabled}
              >
                Start Game
              </Button>
            }[playerPlayingState]
          }
        </Box>

        
        
        
      </Box>
  )
}

export { GameLobby }
