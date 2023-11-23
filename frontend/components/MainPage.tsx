import React, { useState } from "react"
import { Table } from "./Table"
import { Dealer } from "./Dealer"
import { Player } from "./Player"
import { getRandomNumber } from "../temp/randomNumber"

const MainPage = () => {
  const [dealerCoin, setDealerCoin] = useState<Number>(0)
  const [coin, setCoin] = useState<Number>(0)
  const [addCard, setAddCard] = useState<Boolean>(false)
  const [turn, setTurn] = useState<Turn>("ENTERING")
  const [choice, setChoice] = useState<Choice>("NONE")
  const [cards, setCards] = useState<string[]>(["", "", ""])
  const [dealerCards, setDealerCards] = useState<string[]>(["", "", ""])
  if (turn === "STARTING") {
    const card1 = getRandomNumber().toString()
    const card2 = getRandomNumber().toString()
    setCards([card1, card2, ""])
    const dealerCard1 = getRandomNumber().toString()
    const dealerCard2 = getRandomNumber().toString()
    setDealerCards([dealerCard1, dealerCard2, ""])
    setTurn("PLAYER")
  }

  return (
    <div>
      <Dealer
        dealerCards={dealerCards}
        setDealerCards={setDealerCards}
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
        cards={cards}
        setCards={setCards}
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
