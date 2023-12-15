import { Box, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"

const StateBox = ({
  playerInfo,
}) => {
  return (
    <Box
      sx={{
        width: 200,
        height: 100,
        borderRadius: 1,
        bgcolor: grey[400],
      }}
    >
      <Typography> Player Status</Typography>
      <Typography>playerOrder : {playerInfo.playerOrder.toString()}</Typography>
      <Typography>currentChips : {playerInfo.currentChips.toString()}</Typography>
      <Typography>currentBetAmount : {playerInfo.currentBetAmount.toString()}</Typography>
      <Typography>totalBetAmount : {playerInfo.totalBetAmount.toString()}</Typography>
      <Typography>playingState : {Object.keys(playerInfo.playingState)[0]}</Typography>
      <Typography>bettingAction : {Object.keys(playerInfo.bettingAction)[0]}</Typography>
    </Box>
  )
}

export { StateBox }
