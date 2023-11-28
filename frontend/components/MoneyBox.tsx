import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"

const MoneyBox = () => {
  return (
    <div style={{ position: "absolute", right: "30px", top: "35%" }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: grey[400],
        }}
      ></Box>
    </div>
  )
}

export { MoneyBox }
