import React from "react"
import { PokerTable } from "./PokerTable"
import { PlayerButton } from "./PlayerButton"
import { Box } from "@mui/material"
import { brown, indigo } from "@mui/material/colors"

const PlayerPage = () => {
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
        <PokerTable />
        <PlayerButton />
      </Box>
    </div>
  )
}

export { PlayerPage }
