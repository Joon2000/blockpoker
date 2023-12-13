import React from "react"
import { CardBack } from "./CardBack"
import { Box } from "@mui/material"

const CardDeck = () => {
  const i = Array.from({ length: 10 }, (_, index) => index)

  return (
    <Box>
      <CardBack />
      {/* {i.map((n) => (
        <div
          key={n}
          style={{
            position: "absolute",
            left: `${10 + 1 * n}px`,
            top: `${200 + 1 * n}%`,
          }}
        >
          <CardBack />
        </div>
      ))} */}
    </Box>
  )
}

export { CardDeck }
