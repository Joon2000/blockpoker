import { Box } from "@mui/material"
import { brown } from "@mui/material/colors"
import React from "react"

const Message = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "29%",
        top: "37%",
      }}
    >
      <Box
        sx={{
          width: 400,
          height: 100,
          borderRadius: 1,
          bgcolor: brown[100],
        }}
      >
        <p
          style={{
            position: "absolute",
            top: "20%",
            textAlign: "center",
            width: "400px",
            height: "100px",
          }}
        >
          Message
        </p>
      </Box>{" "}
    </div>
  )
}

export { Message }
