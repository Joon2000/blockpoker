import { Button } from "@mui/material"
import React, { useState } from "react"
import { Turn } from "../../src/declarations/Turn"
import { useInterval } from "../hook/useInterval"

const PlayerButton = ({ wallet, setPlayer }) => {
  async function clickStart(e: { preventDefault: () => void }) {
    e.preventDefault()
    console.log(wallet.principal)
    const player = await Turn.playerReady(wallet.principal)
    console.log(player)
    setPlayer(player)
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
