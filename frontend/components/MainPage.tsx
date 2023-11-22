import React, { useState } from "react"
import { Table } from "./Table"
import { Dealer } from "./Dealer"
import { Player } from "./Player"

const MainPage = () => {
  const [dealerCoin, setDealerCoin] = useState<Number>(0)
  const [coin, setCoin] = useState<Number>(0)
  const [addCard, setAddCard] = useState<Boolean>(false)
  const [turn, setTurn] = useState<Turn>("INITIAL")
  const [choice, setChoice] = useState<Choice>("NONE")

  return (
    <div>
      <Dealer
        turn={turn}
        setTurn={setTurn}
        choice={choice}
        setChoice={setChoice}
        dealerCoin={dealerCoin}
        setDealerCoin={setDealerCoin}
        coin={coin}
        addCard={addCard}
      />
      <Table />
      <Player
        turn={turn}
        setTurn={setTurn}
        choice={choice}
        setChoice={setChoice}
        dealerCoin={dealerCoin}
        coin={coin}
        setCoin={setCoin}
        addCard={addCard}
        setAddCard={setAddCard}
      />
    </div>
  )
}

export { MainPage }
