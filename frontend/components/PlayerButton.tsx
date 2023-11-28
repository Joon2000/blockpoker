import { Button } from "@mui/material"
import React from "react"

const PlayerButton = ({ wallet }) => {
  function clickStart() {
    console.log("start")
  }
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Button variant="contained" onClick={clickStart} size="large">
        START
      </Button>
    </div>
  )
}

export { PlayerButton }
