import React, { useEffect, useState } from "react"
import { PokerTable } from "./PokerTable"
import { PlayerButton } from "./PlayerButton"
import { Box, Button } from "@mui/material"
import { brown } from "@mui/material/colors"
import { useInterval } from "../hook/useInterval"
import { Turn } from "../../src/declarations/Turn"
import { Choice } from "frontend/Type"
import { BiCommentDots } from "react-icons/bi"
import { BiMehBlank } from "react-icons/bi"

const PlayerPage = ({ wallet }) => {
  const [player, setPlayer] = useState<string>("NONE")
  const [playerTotalBettingAmount, setPlayerTotalBettingAmount] =
    useState<number>(0)
  const [playerCurrentBettingAmount, setPlayerCurrentBettingAmount] =
    useState<number>(0)
  const [playerBettingChoice, setPlayerBettingChoice] = useState<string>("NONE")
  const [isBothPlayerReady, setIsBothPlayerReady] = useState<boolean>(false)
  const [totalAmountBetting, setTotalAmountBetting] = useState<number>(0)
  const [counterpartTotalBettingAmount, setCounterpartTotalBettingAmount] =
    useState<number>(0)
  const [counterpartCurrentBettingAmount, setCounterpartCurrentBettingAmount] =
    useState<number>(0)
  const [counterpartBettingChoice, setCounterPartBettingChoice] =
    useState<string>("NONE")
  const [gameTurn, setGameTurn] = useState<string>("NEITHER")
  const [playerCards, setPlayerCards] = useState<number[]>([null, null, null])
  const [playerTotalChips, setPlayerTotalChips] = useState<number>(0)
  const [counterpartTotalChips, setcounterTotalChips] = useState<number>(0)

  const fetchUserData = async () => {
    const data = await Turn.getGameData(wallet.principal)
    const cards = await Turn.getPlayerCards(wallet.principal)
    return [data, cards]
  }

  useInterval(async () => {
    if (player != "NONE" && wallet.principal) {
      const [data, cards] = await fetchUserData()
      setPlayerTotalBettingAmount(Number(data[0]))
      setPlayerCurrentBettingAmount(Number(data[1]))
      setPlayerBettingChoice(String(data[2]))
      setIsBothPlayerReady(Boolean(data[3]))
      setTotalAmountBetting(Number(data[4]))
      setCounterpartTotalBettingAmount(Number(data[5]))
      setCounterpartCurrentBettingAmount(Number(data[6]))
      setCounterPartBettingChoice(String(data[7]))
      setGameTurn(String(data[8]))
      setPlayerTotalChips(Number(data[9]))
      setcounterTotalChips(Number(data[10]))
      setPlayerCards([Number(cards[0]), Number(cards[1]), Number(cards[2])])
      return
    } else {
      return
    }
  }, 2000)

  async function clickInitializeGame(e: { preventDefault: any }) {
    e.preventDefault
    await Turn.ToalInitialization()
    console.log("Game Initialized")
  }

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
        <div style={{ marginLeft: "465px" }}>
          <BiMehBlank size="70" />
          {player !== gameTurn && <BiCommentDots size="70" />}
        </div>
        <PokerTable
          playerTotalBettingAmount={playerTotalBettingAmount}
          playerCurrentBettingAmount={playerCurrentBettingAmount}
          playerBettingChoice={playerBettingChoice}
          totalAmountBetting={totalAmountBetting}
          counterpartTotalBettingAmount={counterpartTotalBettingAmount}
          counterpartCurrentBettingAmount={counterpartCurrentBettingAmount}
          counterpartBettingChoice={counterpartBettingChoice}
          gameTurn={gameTurn}
          playerCards={playerCards}
          playerTotalChips={playerTotalChips}
          counterpartTotalChips={counterpartTotalChips}
          wallet={wallet}
        />
        <PlayerButton
          wallet={wallet}
          setPlayer={setPlayer}
          isBothPlayerReady={isBothPlayerReady}
          gameTurn={gameTurn}
          player={player}
        />
      </Box>
      <Button
        variant="contained"
        onClick={clickInitializeGame}
        size="large"
        color="error"
      >
        Initialize Game
      </Button>
    </div>
  )
}

export { PlayerPage }
