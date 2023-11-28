import { Button } from "@mui/material"
import { red } from "@mui/material/colors"
import React from "react"

const PlayerButton = () => {
  function clickStart() {
    console.log("start")
  }
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Button variant="contained" onClick={clickStart}>
        START
      </Button>
    </div>
  )
}

export { PlayerButton }
