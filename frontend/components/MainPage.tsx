import React, { useEffect, useState } from "react"
import { Table } from "./Table"
import { Dealer } from "./Dealer"
import { Player } from "./Player"
import { getRandomNumber } from "../temp/randomNumber"

const MainPage = () => {
  const [dealerCoin, setDealerCoin] = useState<number>(100)
  const [playerCoin, setPlayerCoin] = useState<number>(100)
  const [playerBet, setPlayerBet] = useState<number>(0)
  const [dealerBet, setDealerBet] = useState<number>(0)
  const [addCard, setAddCard] = useState<Boolean>(false)
  const [turn, setTurn] = useState<Turn>("ENTERING")
  const [playerChoice, setPlayerChoice] = useState<Choice>("NONE")
  const [dealerChoice, setDealerChoice] = useState<Choice>("NONE")
  const [playerCards, setPlayerCards] = useState<string[]>(["", "", ""])
  const [dealerCards, setDealerCards] = useState<string[]>(["", "", ""])
  const [round, setRound] = useState<Round>("ROUND1")
  const [callState, setCallState] = useState<CallState[]>([
    "NOTCALL",
    "NOTCALL",
  ])
  const [endGame, setEndGame] = useState<boolean>(false)
  const [totlalBet, setTotalBet] = useState<number>(0)
  if (turn === "STARTING") {
    const card1 = getRandomNumber().toString()
    const card2 = getRandomNumber().toString()
    setPlayerCards([card1, card2, ""])
    const dealerCard1 = getRandomNumber().toString()
    const dealerCard2 = getRandomNumber().toString()
    setDealerCards([dealerCard1, dealerCard2, ""])
    setTurn("DEALER")
  }

  if (
    callState[0] === "CALL" &&
    callState[1] === "CALL" &&
    round === "ROUND1"
  ) {
    const newCard1 = getRandomNumber().toString()
    setPlayerCards((prevCard: string[]) => [prevCard[0], prevCard[1], newCard1])
    const newCard2 = getRandomNumber().toString()
    setDealerCards((prevCard: string[]) => [prevCard[0], prevCard[1], newCard2])
    setAddCard(true)
    setRound("ROUND2")
    setCallState(["NOTCALL", "NOTCALL"])
  }

  useEffect(() => {
    setTotalBet((prevTotalBet) => prevTotalBet + playerBet)
  }, [playerBet])

  useEffect(() => {
    setTotalBet((prevTotalBet) => prevTotalBet + dealerBet)
  }, [dealerBet])

  // useEffect((),[endGame])

  return (
    <div>
      <Dealer
        dealerCards={dealerCards}
        setDealerCards={setDealerCards}
        turn={turn}
        setTurn={setTurn}
        dealerChoice={dealerChoice}
        setDealerChoice={setDealerChoice}
        playerChoice={playerChoice}
        dealerCoin={dealerCoin}
        setDealerCoin={setDealerCoin}
        dealerBet={dealerBet}
        setDealerBet={setDealerBet}
        playerBet={playerBet}
        playerCoin={playerCoin}
        addCard={addCard}
        callState={callState}
        setCallState={setCallState}
        round={round}
        setRound={setRound}
        setEndGame={setEndGame}
      />
      <Table totalBet={totlalBet} />
      <Player
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        turn={turn}
        setTurn={setTurn}
        playerChoice={playerChoice}
        setPlayerChoice={setPlayerChoice}
        dealerChoice={dealerChoice}
        dealerCoin={dealerCoin}
        playerCoin={playerCoin}
        setPlayerCoin={setPlayerCoin}
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
