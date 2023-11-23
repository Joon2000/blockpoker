import React, { useEffect, useState } from "react"
import { Table } from "./Table"
import { Dealer } from "./Dealer"
import { Player } from "./Player"
import { getRandomNumber } from "../temp/randomNumber"

const MainPage = () => {
  const [dealerCoin, setDealerCoin] = useState<Number>(100)
  const [coin, setCoin] = useState<Number>(100)
  const [playerBet, setPlayerBet] = useState<Number>(0)
  const [dealerBet, setDealerBet] = useState<Number>(0)
  const [addCard, setAddCard] = useState<Boolean>(false)
  const [turn, setTurn] = useState<Turn>("ENTERING")
  const [choice, setChoice] = useState<Choice>("NONE")
  const [cards, setCards] = useState<string[]>(["", "", ""])
  const [dealerCards, setDealerCards] = useState<string[]>(["", "", ""])
  const [round, setRound] = useState<Round>("ROUND1")
  const [callState, setCallState] = useState<CallState[]>([
    "NOTCALL",
    "NOTCALL",
  ])
  const [endGame, setEndGame] = useState<boolean>(false)

  if (turn === "STARTING") {
    const card1 = getRandomNumber().toString()
    const card2 = getRandomNumber().toString()
    setCards([card1, card2, ""])
    const dealerCard1 = getRandomNumber().toString()
    const dealerCard2 = getRandomNumber().toString()
    setDealerCards([dealerCard1, dealerCard2, ""])
    setTurn("DEALER")
  }

  // useEffect((),[endGame])

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
        dealerBet={dealerBet}
        setDealerBet={setDealerBet}
        playerBet={playerBet}
        coin={coin}
        addCard={addCard}
        callState={callState}
        setCallState={setCallState}
        round={round}
        setRound={setRound}
        setEndGame={setEndGame}
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
        playerBet={playerBet}
        setPlayerBet={setPlayerBet}
        dealerBet={dealerBet}
        addCard={addCard}
        setAddCard={setAddCard}
        callState={callState}
        setCallState={setCallState}
        round={round}
        setRound={setRound}
        setEndGame={setEndGame}
      />
    </div>
  )
}

export { MainPage }
