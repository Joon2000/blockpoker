import { Box, Grid } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"
import { StateBox } from "./StateBox"
import { MoneyBox } from "./MoneyBox"
import { DealerCards } from "./DealerCards"
import { PLayerCards } from "./PlayerCards"
import { CardDeck } from "./CardDeck"

const PokerTable = () => {
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
        <StateBox position={"OPPONENT"} />
        <DealerCards />
        <CardDeck />
        <MoneyBox />
        <PLayerCards />
        <StateBox position={"PLAYER"} />
      </Box>
    </div>
  )
}

export { PokerTable }
