import { Box } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"
import { StateBox } from "./StateBox"
import { MoneyBox } from "./MoneyBox"
import { DealerCards } from "./DealerCards"
import { PlayerCards } from "./PlayerCards"
import { CardDeck } from "./CardDeck"
import { Message } from "./Message"

const PokerTable = ({
  playerTotalBettingAmount,
  playerCurrentBettingAmount,
  playerBettingChoice,
  totalAmountBetting,
  counterpartTotalBettingAmount,
  counterpartCurrentBettingAmount,
  counterpartBettingChoice,
  gameTurn,
  playerCards,
}) => {
  return (
    <div
      style={{
        width: 950,
        height: 550,
        marginLeft: "25px",
        marginRight: "25px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: 950,
          height: 550,
          borderRadius: 1,
          bgcolor: brown[200],
        }}
      >
        <Message />
        <StateBox
          position={"OPPONENT"}
          playerTotalBettingAmount={playerTotalBettingAmount}
          playerCurrentBettingAmount={playerCurrentBettingAmount}
          counterpartTotalBettingAmount={counterpartTotalBettingAmount}
          counterpartCurrentBettingAmount={counterpartCurrentBettingAmount}
        />
        <DealerCards />
        <CardDeck />
        <MoneyBox totalBettingAmount={totalAmountBetting} />
        <PlayerCards playerCards={playerCards} />
        <StateBox
          position={"PLAYER"}
          playerTotalBettingAmount={playerTotalBettingAmount}
          playerCurrentBettingAmount={playerCurrentBettingAmount}
          counterpartTotalBettingAmount={counterpartTotalBettingAmount}
          counterpartCurrentBettingAmount={counterpartCurrentBettingAmount}
        />
      </Box>
    </div>
  )
}

export { PokerTable }
