import { Box } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"
import { StateBoxRefactor } from "./StateBoxRefactor"
import { MoneyBoxRefactor } from "./MoneyBoxRefactor"
import { CounterpartCardsRefactor } from "./CounterpartCardsRefactor"
import { PlayerCardsRefactor } from "./PlayerCardsRefactor"
import { CardDeck } from "./CardDeck"
import { Message } from "./Message"

const PokerTableRefactor = ({
  wallet,
}) => {
  return (
    <Box
      sx={{
        // width: 950,
        height: 550,
        borderRadius: 1,
        bgcolor: brown[200],
      }}
    >
      <Box  display={"flex"} justifyContent={"center"}>
        <CounterpartCardsRefactor 
        // gameTurn={gameTurn} 
        wallet={wallet} 
        />
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <CounterpartCardsRefactor 
          // gameTurn={gameTurn} 
          wallet={wallet} 
          />
        </Box>
        <Box>
          <MoneyBoxRefactor 
          // totalBettingAmount={totalAmountBetting} 
          />
          <CardDeck />
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <CounterpartCardsRefactor 
          // gameTurn={gameTurn} 
          wallet={wallet} 
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          
        </Box>
        <Box>
          <PlayerCardsRefactor 
          // playerCards={playerCards} 
          />
        </Box>
        <Box>
          <StateBoxRefactor
          // position={"OPPONENT"}
          // playerTotalBettingAmount={playerTotalBettingAmount}
          // playerCurrentBettingAmount={playerCurrentBettingAmount}
          // counterpartTotalBettingAmount={counterpartTotalBettingAmount}
          // counterpartCurrentBettingAmount={counterpartCurrentBettingAmount}
          // playerTotalChips={playerTotalChips}
          // counterpartTotalChips={counterpartTotalChips}
            />
        </Box>
      </Box>
      {/* <Message message={"message"}/> */}
     
      
      
      {/* <StateBoxRefactor
        // position={"PLAYER"}
        // playerTotalBettingAmount={playerTotalBettingAmount}
        // playerCurrentBettingAmount={playerCurrentBettingAmount}
        // counterpartTotalBettingAmount={counterpartTotalBettingAmount}
        // counterpartCurrentBettingAmount={counterpartCurrentBettingAmount}
        // playerTotalChips={playerTotalChips}
        // counterpartTotalChips={counterpartTotalChips}
      /> */}
    </Box>
  )
}

export { PokerTableRefactor }
