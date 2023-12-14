import { Box, Typography } from "@mui/material"
import { blue, brown, red } from "@mui/material/colors"
import React from "react"

const LobbyPlayerCard = ({
  player,
  isMe,
  // playerPrinciple,
  // playinState,
  }) => {

  return (
    <Box
      sx={{
        // width: 400,
        height: 300,
        borderRadius: 1,
        mx: 2,
        bgcolor: isMe ? blue[300] : brown[300],
      }}
    >
      {player!=null&&
      <Box>
        <Typography>{player.address.toString()}</Typography>
        <Typography>playerOrder : {player.playerOrder.toString()}</Typography>
        <Typography>currentChips : {player.currentChips.toString()}</Typography>
        <Typography>playingState : {Object.keys(player.playingState)[0]}</Typography>
        <Typography>bettingAction : {Object.keys(player.bettingAction)[0]}</Typography>
      </Box>}
      
    </Box>
  )
}

export { LobbyPlayerCard }
