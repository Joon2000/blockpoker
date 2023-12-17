import { Box, Typography, Button } from "@mui/material"
import { blue, brown, cyan, grey, indigo, pink, purple, red, yellow } from "@mui/material/colors"
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
        borderRadius: 2,
        mx: 2,
        bgcolor: isMe ? pink[100] : grey[100],
        p : 1,

      }}
    >
      {player!=null&&
      <Box sx={{
        height : "100%",
        alignItems : "stretch"
      }}>
        
        <Box 
        sx={{
          borderRadius: 1, 
          // borderTopRightRadius : 5,
          // borderTopLeftRadius :5,
          // bgcolor : "white",
        }}>
          <Typography variant="caption">{player.address.toString()}<br/></Typography>
        </Box>
        <Box sx={{
          height : 200
        }}>
          {/* <Typography>playingState : {Object.keys(player.playingState)[0]}</Typography> */}
          {/* <Typography>playerOrder : {player.playerOrder.toString()}</Typography> */}
          <Typography>currentChips : {player.currentChips.toString()}</Typography>
          {/* <Typography>bettingAction : {Object.keys(player.bettingAction)[0]}</Typography> */}
          
        </Box>
        <Button
          disabled
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              background: Object.keys(player.playingState)[0] == "ENTER" ? "#B7B7B7" : yellow[900],
              color: "#000000"
            },
            border : 2,
            width : "100%",
            height :50,
          }}
        >
          {Object.keys(player.playingState)[0]}
        </Button>
      </Box>}
    </Box>
  )
}

export { LobbyPlayerCard }
