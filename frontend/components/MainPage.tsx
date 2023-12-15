import React, { useEffect, useState } from "react"
import { PokerTable } from "./PokerTable"
import { GameEndPage } from "./GameEndPage"
import { Box, Button } from "@mui/material"
import { brown } from "@mui/material/colors"
import { useInterval } from "../hook/useInterval"
import { poker} from "../../src/declarations/poker"
import { Typography } from '@mui/material';
import { SharedPlayer } from "src/declarations/poker/poker.did"
import { Principal } from "@dfinity/principal"
import {GameLobby} from "./GameLobby"
// import { Principal } from "@dfinity/candid/lib/cjs/idl"

const MainPage = ({ wallet }) => {
  // Game Status
  const [playingState, setPlayingState] = useState<string>("");
  const [masterPlayer, setMasterPlayer] = useState<string>("");
  const [gameTurn, setGameTurn] = useState<string>("");
  const [isAllPlayerCall, setIsAllPlayerCall] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");

  // Money Box Informations
  const [totalBetAmount, setTotalBetAmount] = useState<number>(0);

  // Player Informations
  const [playerInfo, setPlayerInfo] = useState<null|SharedPlayer>(null);
  const [playerInfoArray, setPlayerInfoArray] = useState<SharedPlayer[]>([]);
  const [playerNumber, setPlayerNumber] = useState<number>(0);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const [playerCrpytoNumber, setPlayerCrpytoNumber] = useState<number>(0);

  useInterval(async () => {
    updateState();
  }, 2000)

  useEffect(()=>{
    updateState();
  },[])

  async function updateState() {
    const gameStatus = await poker.getGameStatus();
    setPlayingState(Object.keys(gameStatus.playingStatus)[0]);
    setMasterPlayer(gameStatus.masterPlayer.toString());
    setGameTurn(gameStatus.gameTurn.toString());
    setIsAllPlayerCall(gameStatus.isAllPlayerCall);
    setWinner(gameStatus.winner.toString());

    const totalBetAmount = await poker.getTotalBetAmount();
    setTotalBetAmount(Number(totalBetAmount));

    const playerCrpytoNumber = await poker.getPlayerCryptoNumber(Principal.fromText(wallet.principal));
    setPlayerCrpytoNumber(Number(playerCrpytoNumber));
    console.log("player crypto numb", playerCrpytoNumber);

    const playerInfoArray = await poker.getPlayerInfoArray();
    playerInfoArray.sort( compare );
    setPlayerInfoArray(playerInfoArray);
    setPlayerNumber(playerInfoArray.length);
    const playerInfo = await poker.getPlayerInfo(Principal.fromText(wallet.principal));
    setPlayerInfo(playerInfo[0]);

    // console.log("playerNumber", playerNumber);
    // console.log("player Info", playerInfo);
    console.log("wallet :", wallet.principal.toString());
    // console.log("playerOrderNumber :", playerInfoArray[Number(playerInfo[0].playerOrder)%4].playerOrder)
    // console.log("playerOrderNumber :", playerInfoArray[(Number(playerInfo[0].playerOrder)+1)%4].playerOrder)
    // console.log("playerOrderNumber :", playerInfoArray[(Number(playerInfo[0].playerOrder)+2)%4].playerOrder)
    // console.log("playerOrderNumber :", playerInfoArray[(Number(playerInfo[0].playerOrder)+3)%4].playerOrder)
  };

  function compare( a, b ) {
    if ( a.playerOrder < b.playerOrder ){
      return -1;
    }
    if ( a.playerOrder > b.playerOrder ){
      return 1;
    }
    return 0;
  }

  async function exitGame(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.exitGame(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("Exit Game")
  };
  async function getPokerChips(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.test_addPokerChip(Principal.fromText(wallet.principal));
    setIsButtonDisabled(false);
    updateState();

    console.log("Exit Game")
  };

  return (
    <Box>
      
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography> Here Is MainPage</Typography>
          <Typography>player's wallet principal : {wallet.principal}</Typography>
        </Box>
        {playerInfo!=null &&
          <Button
            variant="contained"
            onClick={exitGame}
            size="large"
            color="primary"
            disabled={isButtonDisabled}
          >
            Exit Game
          </Button>
        }
        <Button
          variant="contained"
          onClick={getPokerChips}
          size="large"
          color="primary"
          disabled={isButtonDisabled}
        >
          {"Exchange ICP ->Poker Chips"}
        </Button>
        
      </Box>
      
      <Box
        sx={{
          minHeight : 700,
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
        <Typography>winner : {winner}</Typography>

        {
        playingState === "NOT_ALL_READY" || playingState === "ALL_READY" ? 
        <GameLobby 
        wallet={wallet} 
        playerInfo={playerInfo} 
        playerInfoArray={playerInfoArray} 
        masterPlayer={masterPlayer} 
        playingState={playingState}
        updateState={updateState}
        /> 
        : playingState === "PLAYING" ? 
        <PokerTable 
        wallet={wallet}
        gameTurn={gameTurn}
        totalBetAmount={totalBetAmount}
        playerInfo={playerInfo}
        playerInfoArray={playerInfoArray}
        playerCrpytoNumber={playerCrpytoNumber}
        isAllPlayerCall={isAllPlayerCall}
        updateState={updateState}
        />
        : playingState === "GAME_END" ?
        <GameEndPage 
        wallet={wallet}
        gameTurn={gameTurn}
        totalBetAmount={totalBetAmount}
        playerInfo={playerInfo}
        playerInfoArray={playerInfoArray}
        playerCrpytoNumber={playerCrpytoNumber}
        updateState={updateState}
        />
        : <Box/>
        }
      </Box>
   
      
    </Box>
  )
}

export { MainPage }
