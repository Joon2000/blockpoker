import { Button, Grid, TextField } from "@mui/material"
import React, { useState } from "react"
import { Turn } from "../../src/declarations/Turn"
import { ibe_encrypt, internetIdentityLogin } from "../utils/vetKeys"

const PlayerButton = ({
  wallet,
  setPlayer,
  isBothPlayerReady,
  gameTurn,
  player,
  iIPrincipal,
  setIIPrincipal,
}) => {
  const [number, setNumber] = useState<string>("")

  async function clickStart(e: { preventDefault: () => void }) {
    e.preventDefault()
    console.log(number)
    const ibeCiphertext = await ibe_encrypt(
      number,
      "jni24-wbssg-pqg57-6qqxv-w4jjp-cgqh6-uzcu6-4agen-o7czc-vfa6k-tqe",
    )
    console.log(wallet.principal)
    const player = await Turn.playerReady(
      wallet.principal,
      ibeCiphertext,
      iIPrincipal,
    )
    console.log(player)
    setPlayer(player)
  }
  async function clickFold(e: { preventDefault: () => void }) {
    e.preventDefault()
    Turn.Fold(wallet.principal)
  }
  async function clickCall(e: { preventDefault: () => void }) {
    e.preventDefault()
    Turn.Call(wallet.principal)
  }
  async function clickRaise(e: { preventDefault: () => void }) {
    e.preventDefault()
    Turn.Raise(wallet.principal)
  }
  async function clickContinue(e: { preventDefault: () => void }) {
    e.preventDefault()
    Turn.initializeGame()
  }
  async function getInternetIdentity(e: { preventDefault: () => void }) {
    e.preventDefault()
    const internetIdentityPrincipal = await internetIdentityLogin()
    setIIPrincipal(internetIdentityPrincipal.toString())
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      {isBothPlayerReady ? (
        gameTurn === "END" ? (
          <div>
            <Button
              variant="contained"
              onClick={clickContinue}
              size="large"
              disabled={player !== "PLAYER1"}
            >
              Continue
            </Button>
          </div>
        ) : (
          <div>
            <Grid container spacing={4}>
              <Grid item xs={6} md={4}>
                <Button
                  variant="contained"
                  onClick={clickFold}
                  size="large"
                  color="error"
                  disabled={player !== gameTurn}
                >
                  Fold
                </Button>
              </Grid>
              <Grid item xs={6} md={4}>
                <Button
                  variant="contained"
                  onClick={clickCall}
                  size="large"
                  disabled={player !== gameTurn}
                >
                  Call
                </Button>
              </Grid>
              <Grid item xs={6} md={4}>
                <Button
                  variant="contained"
                  onClick={clickRaise}
                  size="large"
                  color="success"
                  disabled={player !== gameTurn}
                >
                  Raise
                </Button>
              </Grid>
            </Grid>
          </div>
        )
      ) : !iIPrincipal ? (
        <div>
          <Button
            variant="contained"
            onClick={getInternetIdentity}
            size="large"
          >
            Get Internet Identity
          </Button>
        </div>
      ) : (
        <div>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            placeholder="Enter any number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
          <Button variant="contained" onClick={clickStart} size="large">
            START
          </Button>
        </div>
      )}
    </div>
  )
}

export { PlayerButton }
