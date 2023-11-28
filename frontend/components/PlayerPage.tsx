import React, { useEffect } from "react"
import { PokerTable } from "./PokerTable"
import { PlayerButton } from "./PlayerButton"
import { Box } from "@mui/material"
import { brown } from "@mui/material/colors"

const PlayerPage = ({ wallet }) => {
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
        <PlayerButton wallet={wallet} />
      </Box>
    </div>
  )
}

export { PlayerPage }
