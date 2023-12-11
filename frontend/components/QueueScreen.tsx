import { Box } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"
import { StateBoxRefactor } from "./StateBoxRefactor"
import { MoneyBoxRefactor } from "./MoneyBoxRefactor"
import { CounterpartCardsRefactor } from "./CounterpartCardsRefactor"
import { PlayerCardsRefactor } from "./PlayerCardsRefactor"
import { CardDeck } from "./CardDeck"
import { Message } from "./Message"

const QueueScreen = ({
  wallet,
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
        <p> Queue Screen </p>
       
      </Box>
    </div>
  )
}

export { QueueScreen }
