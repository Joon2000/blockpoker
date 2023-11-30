import React, { useEffect, useState } from "react"
import { PokerTable } from "./PokerTable"
import { PlayerButton } from "./PlayerButton"
import { Box } from "@mui/material"
import { brown } from "@mui/material/colors"
import { useInterval } from "../hook/useInterval"
import { Turn } from "../../src/declarations/Turn"
import { Choice } from "frontend/Type"

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

  const fetchUserData = async () => {
    const data = await Turn.getGameData(wallet.principal)
    const cards = await Turn.getPlayer1Cards(wallet.principal)
    return [data, cards]
  }

  useInterval(async () => {
    if (player != "NONE" && wallet.principal) {
      const [data, cards] = await fetchUserData()
      setPlayerTotalBettingAmount(Number(data[0]))
      setPlayerCurrentBettingAmount(Number(data[1]))
      setPlayerBettingChoice(data[2])
      setIsBothPlayerReady(data[3])
      setTotalAmountBetting(Number(data[4]))
      setCounterpartTotalBettingAmount(Number(data[5]))
      setCounterpartCurrentBettingAmount(Number(data[6]))
      setCounterPartBettingChoice(data[7])
      setGameTurn(data[8])
      // console.log("card1", cards[0][0][0])
      // console.log("card2", cards[0][1][0])
      // console.log("card3", cards[0][2][0])
      setPlayerCards([
        Number(cards[0][0][0]),
        Number(cards[0][1][0]),
        Number(cards[0][2][0]),
      ])
      return
    } else {
      return
    }
  }, 2000)

  return (
    <div style={{ marginTop: "40px" }}>
      <Box
        sx={{
          width: 1000,
          height: 650,
          borderRadius: 1,
          bgcolor: brown[100],
          pt: 6,
        }}
      >
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
        />
        <PlayerButton wallet={wallet} setPlayer={setPlayer} />
      </Box>
    </div>
  )
}

export { PlayerPage }
