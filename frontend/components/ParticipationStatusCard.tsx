import { Box, Typography } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"

const ParticipationStatusCard = ({
  playerPrinciple,
  playinState,
  }) => {
  return (
    <Box
      sx={{
        // width: 400,
        height: 300,
        borderRadius: 1,
        mx: 2,
        bgcolor: brown[300],
      }}
    >
      <Typography>{playerPrinciple}</Typography>
      <Typography>{playinState}</Typography>
    </Box>
  )
}

export { ParticipationStatusCard }
