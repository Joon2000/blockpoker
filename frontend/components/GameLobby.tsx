import React, { useEffect, useState } from "react"
import { Box, Button, Grid } from "@mui/material"
import { brown, green, yellow } from "@mui/material/colors"
import { LobbyPlayerCard } from "./LobbyPlayerCard"
import { poker} from "../../src/declarations/poker"
import { Principal } from "@dfinity/principal"
import { Typography } from '@mui/material';


const GameLobby = ({
  wallet,
  playerInfo,
  playerInfoArray,
  masterPlayer,
  playingState,
  updateState
}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  async function enterGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.enterGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState()

    console.log("Game enterGame")
  };

  async function readyGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.readyGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState()

    console.log("Game readyGame")
  };

  async function cancelReadyGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.cancelReadyGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState()

    console.log("Cancel readyGame")
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
    updateState()

    console.log("Game startGame")
  };

  return (
      <Box
        sx={{
          minHeight: 600,
          borderRadius: 1,
          bgcolor: brown[300],
          // pb: 5,
          pt : 5,
        }}
      >
        <Box sx={{minHeight: 500}}>
          <Grid container spacing={2}>
            {playerInfoArray!=null && 
            playerInfoArray.map((player)=>{
              var isMe = false;
              if (wallet.principal.toString() == player.address.toString()) {
                isMe = true;
              };
              
              var isMaster = false;
              if (player.address.toString() == masterPlayer.toString()) {
                isMaster = true;
              };
              return(
                <Grid item xs={6} md={3} key={player.address.toString()}>
                  <LobbyPlayerCard player={player} isMe={isMe} isMaster={isMaster}/>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <Box sx={{ml:2, mt: 5, display : "flex", justifyContent : "space-around"}}>
          {playerInfo == null ? 
          <Button
              variant="contained"
              onClick={enterGame}
              size="large"
              color="primary"
              disabled={isButtonDisabled}
            > Enter Game </Button>
            : Object.keys(playerInfo.playingState)[0]=="READY" ?
            <Button
              variant="contained"
              onClick={cancelReadyGame}
              size="large"
              color="inherit"
              disabled={isButtonDisabled}
            > Cancel Ready </Button>
            :
            <Button
              variant="contained"
              onClick={readyGame}
              size="large"
              color="warning"            
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
