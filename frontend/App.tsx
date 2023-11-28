import React, { useState } from "react"
import logo from "./assets/dfinity.svg"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
} from "@connect2ic/react"
import "@connect2ic/core/style.css"
/*
 * Import canister definitions like this:
 */
// import * as counter from "../.dfx/local/canisters/counter"
/*
 * Some examples to get you started
 */
import { Counter } from "./components/Counter"
import { Transfer } from "./components/Transfer"
import { Profile } from "./components/Profile"

import { useWallet } from "@connect2ic/react"
import { MainPage } from "./components/MainPage"
import { ConnectWallet } from "./components/ConnectWallet"
import { PlayerPage } from "./components/PlayerPage"
import { Container } from "@mui/material"

function App() {
  const [wallet] = useWallet()
  return (
    <Container maxWidth={"lg"}>
      <div className="button--container">
        <div className="connect--button">
          <ConnectButton />
        </div>
      </div>
      <ConnectDialog />

      {wallet ? <PlayerPage /> : <ConnectWallet />}
    </Container>
  )
}

const client = createClient({
  canisters: {
    // counter,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
