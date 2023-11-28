import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"

const StateBox = ({ position }) => {
  return (
    <div
      style={
        position === "OPPONENT"
          ? { position: "absolute", left: "30px", top: "10px" }
          : { position: "absolute", right: "30px", bottom: "10px" }
      }
    >
      <Box
        sx={{
          width: 200,
          height: 100,
          borderRadius: 1,
          bgcolor: grey[400],
        }}
      ></Box>
    </div>
  )
}

export { StateBox }
