import { Button, Box, Grid, TextField } from "@mui/material"
import React, { useState } from "react"
import { Principal } from "@dfinity/principal"
import { poker} from "../../src/declarations/poker"

const PokerGameButton = ({
  wallet,
  gameTurn,
  playerInfo,
  isAllPlayerCall,
  updateState,
}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  async function call(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.call(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("Call")
  };
  async function raise(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.raise(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("Raise")
  };
  async function fold(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.fold(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("fold")
  };

  async function drawCard(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.getMoreCard(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("draw card")
  };

  async function stopGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.stopGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("stop game")
  };


  return (
    <Box>
      {playerInfo!=null ?
      Object.keys(playerInfo.bettingAction)[0] == "FOLD" ?
      <Button
          variant="contained"
          onClick={fold}
          size="large"
          color="primary"
          disabled={isButtonDisabled}
        > Fold </Button>
      :
        <Box sx={{
          // display : "flex",
          // alignItems : "baseline",
          // justifyContent : "space-around",
        }}>
          <Button
            variant="contained"
            onClick={call}
            size="large"
            color="primary"
            disabled={isButtonDisabled}
          > Call </Button>
          <Button
            variant="contained"
            onClick={raise}
            size="large"
            color="primary"
            disabled={isButtonDisabled}
          > Raise </Button>
          <Button
            variant="contained"
            onClick={fold}
            size="large"
            color="primary"
            disabled={isButtonDisabled}
          > Fold </Button>
        </Box>
      :
      <Box></Box>
      }
      {
      playerInfo!=null && gameTurn.toString() == playerInfo.playerOrder.toString() && isAllPlayerCall &&
      <Button
        variant="contained"
        onClick={drawCard}
        size="large"
        color="primary"
        disabled={isButtonDisabled}
      > Draw Card </Button> 
      }
      {
      playerInfo!=null && gameTurn.toString() == playerInfo.playerOrder.toString() && isAllPlayerCall &&
      <Button
        variant="contained"
        onClick={stopGame}
        size="large"
        color="primary"
        disabled={isButtonDisabled}
      > Stop Game </Button> 
      }
        
    </Box>
  )
}

export { PokerGameButton }
