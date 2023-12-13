import { Box } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"
import { StateBoxRefactor } from "./StateBoxRefactor"
import { MoneyBoxRefactor } from "./MoneyBoxRefactor"
import { CounterpartCardsRefactor } from "./CounterpartCardsRefactor"
import { PlayerCards } from "./PlayerCards"
import { CardDeck } from "./CardDeck"
import { Message } from "./Message"

const PokerTableRefactor = ({
  wallet,
  playerInfo,
  playerInfoArray,
  updateState,
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
      <Box  display={"flex"} justifyContent={"space-between"}>
        <Box></Box>
        <Box>
          <CounterpartCardsRefactor 
          // gameTurn={gameTurn} 
          wallet={wallet} 
          />
        </Box>
        <Box></Box>
        
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
          <PlayerCards 
          playerInfo={playerInfo}
          />
        </Box>
        <Box>
          <StateBoxRefactor/>
        </Box>
      </Box>
    </Box>
  )
}

export { PokerTableRefactor }
