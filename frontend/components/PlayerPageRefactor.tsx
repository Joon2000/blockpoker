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
import {QueueScreen} from "./QueueScreen"
// import { Principal } from "@dfinity/candid/lib/cjs/idl"




const PlayerPageRefactor = ({ wallet }) => {

  const [playingStatus, setPlayingStatus] = useState<string>("");
  const [masterPlayer, setMasterPlayer] = useState<string>();
  const [gameTurn, setGameTurn] = useState<string>("");
  const [isAllPlayerCall, setIsAllPlayerCall] = useState<boolean>(false);
  const [playerInfoArray, setPlayerInfoArray] = useState<SharedPlayer[]>([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useInterval(async () => {
    const gameStatus = await poker.getGameStatus();
    setPlayingStatus(Object.keys(gameStatus.playingStatus)[0]);
    setMasterPlayer(gameStatus.masterPlayer.toString());
    setGameTurn(gameStatus.gameTurn.toString());
    setIsAllPlayerCall(gameStatus.isAllPlayerCall);

    const playerInfoArray = await poker.getPlayerInfoArray();
    setPlayerInfoArray(playerInfoArray);
    console.log("wallet :", wallet.principal);

  }, 2000)

  async function enterGame(e: { preventDefault: any }) {
    setIsButtonDisabled(true);
    await poker.enterGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);

    e.preventDefault

    console.log("Game enterGame")
  };

  async function readyGame(e: { preventDefault: any }) {
    setIsButtonDisabled(true);
    await poker.readyGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);

    e.preventDefault

    console.log("Game readyGame")
  };

  async function startGame(e: { preventDefault: any }) {
    setIsButtonDisabled(true);
    await poker.startGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    console.log("Game startGame")
  };

  async function endGame(e: { preventDefault: any }) {
    setIsButtonDisabled(true);
    await poker.endGame();
    setIsButtonDisabled(false);
    console.log("Game endGame")
  };


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
        <Typography>wallet principal : {wallet.principal}</Typography>
        <Typography>playingStatus : {playingStatus}</Typography>
        <Typography>masterPlayer : {masterPlayer}</Typography>
        <Typography>gameTurn : {gameTurn}</Typography>
        <Typography>isAllPlayerCall : {isAllPlayerCall.toString()}</Typography>

        <Box>
          <Typography>{playerInfoArray.map((playerInfo)=>(playerInfo.address.toString()))}</Typography>
        </Box>
        
        {playingStatus == "PLAYING" 
        ? <PokerTableRefactor wallet={wallet}/> : playingStatus == "GAME_END" 
        ? <PokerTableRefactor wallet={wallet}/> : <QueueScreen wallet={wallet}/>}
        
      </Box>
      
      <Button
        variant="contained"
        onClick={startGame}
        size="large"
        color="error"
        disabled={isButtonDisabled}
      >
        Start Game
      </Button>
      <Button
        variant="contained"
        onClick={readyGame}
        size="large"
        color="warning"
        disabled={isButtonDisabled}
      >
        Ready Game
      </Button>
      <Button
        variant="contained"
        onClick={enterGame}
        size="large"
        color="primary"
        disabled={isButtonDisabled}
      >
        Enter Game
      </Button>
      <Button
        variant="contained"
        onClick={endGame}
        size="large"
        color="primary"
        disabled={isButtonDisabled}
      >
        End Game
      </Button>
    </div>
  )
}

export { PlayerPageRefactor }
