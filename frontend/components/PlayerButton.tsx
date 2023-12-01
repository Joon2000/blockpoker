import { Button, Grid } from "@mui/material"
import React, { useState } from "react"
import { Turn } from "../../src/declarations/Turn"
import { useInterval } from "../hook/useInterval"

const PlayerButton = ({ wallet, setPlayer, isBothPlayerReady, gameTurn }) => {
  async function clickStart(e: { preventDefault: () => void }) {
    e.preventDefault()
    console.log(wallet.principal)
    const player = await Turn.playerReady(wallet.principal)
    console.log(player)
    setPlayer(player)
  }
  async function clickFold(e: { preventDefault: () => void }) {
    e.preventDefault()
  }
  async function clickCall(e: { preventDefault: () => void }) {
    e.preventDefault()
  }
  async function clickRaise(e: { preventDefault: () => void }) {
    e.preventDefault()
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      {isBothPlayerReady ? (
        <div>
          <Grid container spacing={4}>
            <Grid item xs={6} md={4}>
              <Button
                variant="contained"
                onClick={clickFold}
                size="large"
                color="error"
              >
                Fold
              </Button>
            </Grid>
            <Grid item xs={6} md={4}>
              <Button variant="contained" onClick={clickCall} size="large">
                Call
              </Button>
            </Grid>
            <Grid item xs={6} md={4}>
              <Button
                variant="contained"
                onClick={clickRaise}
                size="large"
                color="success"
              >
                Raise
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Button variant="contained" onClick={clickStart} size="large">
          START
        </Button>
      )}
    </div>
  )
}

export { PlayerButton }
