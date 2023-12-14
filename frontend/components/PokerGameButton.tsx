import { Button, Box, Grid, TextField } from "@mui/material"
import React, { useState } from "react"
import { Turn } from "../../src/declarations/Turn"
import { internetIdentityLogin } from "../utils/vetKeys"
import { Principal } from "@dfinity/principal"

const PokerGameButton = ({
  updateState,
}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  async function bet(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    // await poker.exitGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("Call")
  };
  async function call(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    // await poker.exitGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("Call")
  };
  async function raise(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    // await poker.exitGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("Raise")
  };
  async function fold(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    // await poker.exitGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("fold")
  };

  return (
    <Box>
      <Button
            variant="contained"
            onClick={bet}
            size="large"
            color="primary"
            disabled={isButtonDisabled}
          > Bet </Button>
          <Button
            variant="contained"
            onClick={call}
            size="large"
            color="primary"
            disabled={isButtonDisabled}
          > Call </Button>
          <Button
            variant="contained"
            onClick={call}
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
  )
}

export { PokerGameButton }
