import { Box, Typography } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"

const Message = ({
  message,
  }) => {
  return (
      <Box
        sx={{
          // width: 400,
          // height: 300,
          borderRadius: 1,
          bgcolor: brown[300],
        }}
      >
        <Typography>{message}</Typography>
      </Box>
  )
}

export { Message }
