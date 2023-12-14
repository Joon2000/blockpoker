import { Box, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"

const StateBoxRefactor = ({
  playerInfo,
  // position,
  // playerTotalBettingAmount,
  // playerCurrentBettingAmount,
  // counterpartTotalBettingAmount,
  // counterpartCurrentBettingAmount,
  // playerTotalChips,
  // counterpartTotalChips,
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
      {/* <Typography>totalCardNumber : {playerInfo.totalCardNumber.toString()}</Typography> */}
      <Typography>currentChips : {playerInfo.currentChips.toString()}</Typography>
      <Typography>currentBetAmount : {playerInfo.currentBetAmount.toString()}</Typography>
      <Typography>totalBetAmount : {playerInfo.totalBetAmount.toString()}</Typography>
      <Typography>playingState : {Object.keys(playerInfo.playingState)[0]}</Typography>
      <Typography>bettingAction : {Object.keys(playerInfo.bettingAction)[0]}</Typography>
      {/* <div style={{ textAlign: "center" }}>
        {position === "OPPONENT" ? (
          <div style={{}}>
            <p>{`Chips: ${counterpartTotalChips}`}</p>
            <p>{`Current Betting: ${counterpartCurrentBettingAmount}`}</p>
            <p>{`Total Betting: ${counterpartTotalBettingAmount}`}</p>
          </div>
        ) : (
          <div style={{}}>
            <p>{`Chips: ${playerTotalChips}`}</p>
            <p>{`Current Betting: ${playerCurrentBettingAmount}`}</p>
            <p>{`Total Betting: ${playerTotalBettingAmount}`}</p>
          </div>
        )}
      </div> */}
    </Box>
  )
}

export { StateBoxRefactor }
