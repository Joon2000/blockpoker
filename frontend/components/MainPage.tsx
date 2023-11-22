import React, { useState } from "react"
import { Table } from "./Table"
import { Dealer } from "./Dealer"
import { Player } from "./Player"

const MainPage = () => {
  const [getCard, setGetCard] = useState<boolean>(false)

  return (
    <div>
      <Dealer />
      <Table />
      <Player />
    </div>
  )
}

export { MainPage }
