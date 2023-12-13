import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"

const StateBoxRefactor = ({
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
