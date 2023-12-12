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
import { SharedGameStatus, GamePlayingState, SharedPlayer } from "src/declarations/poker/poker.did"
import { Principal } from "@dfinity/principal"
import {GameLobby} from "./GameLobby"
// import { Principal } from "@dfinity/candid/lib/cjs/idl"
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent, Actor } from "@dfinity/agent";
import {createActor, vet_key} from "../../src/declarations/vet_key"

const MainPage = ({ wallet }) => {
  // Game Status
  const [playingState, setPlayingState] = useState<string>("");
  const [masterPlayer, setMasterPlayer] = useState<string>();
  const [gameTurn, setGameTurn] = useState<string>("");
  const [isAllPlayerCall, setIsAllPlayerCall] = useState<boolean>(false);

  // Player Informations
  const [playerInfo, setPlayerInfo] = useState<null|SharedPlayer>();
  const [playerInfoArray, setPlayerInfoArray] = useState<SharedPlayer[]>([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useInterval(async () => {
    const gameStatus = await poker.getGameStatus();
    setPlayingState(Object.keys(gameStatus.playingStatus)[0]);
    setMasterPlayer(gameStatus.masterPlayer.toString());
    setGameTurn(gameStatus.gameTurn.toString());
    setIsAllPlayerCall(gameStatus.isAllPlayerCall);

    const playerInfoArray = await poker.getPlayerInfoArray();
    setPlayerInfoArray(playerInfoArray);
    const playerInfo = await poker.getPlayerInfo(Principal.fromText(wallet.principal));
    setPlayerInfo(playerInfo[0]);
    console.log("player info", playerInfo[0]);
    console.log("wallet :", wallet.principal);

  }, 2000)
 





  async function endGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.endGame();
    setIsButtonDisabled(false);

    console.log("Game endGame")
  };
 


  return (
    <Box>
      <Typography> Here Is MainPage</Typography>
      <Typography>player's wallet principal : {wallet.principal}</Typography>
      <Box
        sx={{
          // width: 1000,
          // height: 700,
          borderRadius: 1,
          bgcolor: brown[100],
        }}
      >
        <Typography> Here Is an Box in the MainPage</Typography>

        <Typography> Game Status</Typography>
        <Typography>playingStatus : {playingState}</Typography>
        <Typography>masterPlayer : {masterPlayer}</Typography>
        <Typography>gameTurn : {gameTurn}</Typography>
        <Typography>isAllPlayerCall : {isAllPlayerCall.toString()}</Typography>

        

        {playingState == "PLAYTING" ? <PokerTableRefactor wallet={wallet}/>
        : playingState == "GAME_END" ? <PokerTableRefactor wallet={wallet}/>
        :  <GameLobby 
        wallet={wallet} 
        playerInfo={playerInfo} 
        playerInfoArray={playerInfoArray} 
        masterPlayer={masterPlayer} /> }
      </Box>
   
      <Button
        variant="contained"
        onClick={endGame}
        size="large"
        color="primary"
        disabled={isButtonDisabled}
      >
        End Game
      </Button>
    </Box>
  )
}

export { MainPage }
