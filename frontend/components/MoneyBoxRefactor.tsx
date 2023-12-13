import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"
import pokerChips from "../assets/poker-chips.png"

const MoneyBoxRefactor = ({ 
  // totalBettingAmount 
}) => {
  return (
    <Box>
      <img src={pokerChips} alt="poker-chips" width={120} height={120} />
      <Box
        sx={{
          width: 120,
          height: 30,
          borderRadius: 1,
          bgcolor: grey[400],
        }}
      >
        {/* total: {totalBettingAmount} */}
        total: 10
      </Box>
    </Box>
  )
}

export { MoneyBoxRefactor }
