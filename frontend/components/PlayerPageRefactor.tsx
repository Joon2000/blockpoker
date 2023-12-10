import React, { useEffect, useState } from "react"
import { PokerTableRefactor } from "./PokerTableRefactor"
import { PlayerButton } from "./PlayerButton"
import { Box, Button } from "@mui/material"
import { brown } from "@mui/material/colors"
import { useInterval } from "../hook/useInterval"
import { Turn } from "../../src/declarations/Turn"
import { Choice } from "frontend/Type"
import { BiCommentDots } from "react-icons/bi"
import { BiMehBlank } from "react-icons/bi"
import { ibe_decrypt, ibe_encrypt } from "../utils/vetKeys"
import { poker } from "../../src/declarations/poker"

const PlayerPageRefactor = ({ wallet }) => {

  useInterval(async () => {
    const gameStatus = await poker.getGameStatus();
    const playerInfoList = await poker.getPlayerInfoList();
    console.log("gameStatus :",gameStatus);
    console.log("player info list :", playerInfoList);
    console.log("wallet", wallet);

  }, 2000)

  return (
    <div style={{ marginTop: "40px" }}>
      <Box
        sx={{
          width: 1000,
          height: 700,
          borderRadius: 1,
          bgcolor: brown[100],
        }}
      >
       <PokerTableRefactor
          wallet={wallet}
        />
      </Box>
      
      <Button
        variant="contained"
        // onClick={clickInitializeGame}
        size="large"
        color="error"
      >
        Initialize Game 123123
      </Button>
    </div>
  )
}

export { PlayerPageRefactor }
