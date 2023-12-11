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
import { poker} from "../../src/declarations/poker"
import { Typography } from '@mui/material';
import { SharedGameStatus, PlayingStatus, SharedPlayer } from "src/declarations/poker/poker.did"
import { Principal } from "@dfinity/principal"




const PlayerPageRefactor = ({ wallet }) => {

  const [playingStatus, setPlayingStatus] = useState<string>("");
  const [masterPlayer, setMasterPlayer] = useState<string>();
  const [gameTurn, setGameTurn] = useState<string>("");
  const [isAllPlayerCall, setIsAllPlayerCall] = useState<boolean>(false);
  const [playerInfoArray, setPlayerInfoArray] = useState<SharedPlayer[]>([]);

  useInterval(async () => {
    const gameStatus = await poker.getGameStatus();
    setPlayingStatus(Object.keys(gameStatus.playingStatus)[0]);
    setMasterPlayer(gameStatus.masterPlayer.toString());
    setGameTurn(gameStatus.gameTurn.toString());
    setIsAllPlayerCall(gameStatus.isAllPlayerCall);

    const playerInfoArray = await poker.getPlayerInfoArray();
    setPlayerInfoArray(playerInfoArray);
    console.log("player info array :", playerInfoArray);

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
        <Typography>playingStatus : {playingStatus}</Typography>
        <Typography>masterPlayer : {masterPlayer}</Typography>
        <Typography>gameTurn : {gameTurn}</Typography>
        <Typography>isAllPlayerCall : {isAllPlayerCall.toString()}</Typography>

        {playerInfoArray.map((playerInfo)=>(playerInfo.address.toString()))}

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
