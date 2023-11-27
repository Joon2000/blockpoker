import React, { useEffect, useState } from "react"
import { Table } from "./Table"
import { Dealer } from "./Dealer"
import { Player } from "./Player"
import { getRandomNumber } from "../temp/randomNumber"
import { Choice, Round, Turn } from "../Type"
import { randomNumber } from "../../src/declarations/randomNumber"

const MainPage = () => {
  const [dealerCoin, setDealerCoin] = useState<number>(10000)
  const [playerCoin, setPlayerCoin] = useState<number>(10000)
  const [playerBet, setPlayerBet] = useState<number>(0)
  const [dealerBet, setDealerBet] = useState<number>(0)
  const [addCard, setAddCard] = useState<Boolean>(false)
  const [turn, setTurn] = useState<Turn>("ENTERING")
  const [playerChoice, setPlayerChoice] = useState<Choice>("NONE")
  const [dealerChoice, setDealerChoice] = useState<Choice>("NONE")
  const [playerCards, setPlayerCards] = useState<string[]>(["", "", ""])
  const [dealerCards, setDealerCards] = useState<string[]>(["", "", ""])
  const [round, setRound] = useState<Round>("ROUND1")
  const [callState, setCallState] = useState<boolean>(false)
  const [endGame, setEndGame] = useState<boolean>(false)
  const [totlalBet, setTotalBet] = useState<number>(0)
  const [playerTotalBet, setPlayerTotalBet] = useState<number>(0)
  const [dealerTotalBet, setDealerTotalBet] = useState<number>(0)
  const [winner, setWinner] = useState<string>("")

  async function getCard() {
    const randomNum = await randomNumber.generateRandomNumber()
    return (parseInt(randomNum.toString()) % 10).toString()
  }

  useEffect(() => {
    const initializeCard = async () => {
      if (turn === "STARTING" && addCard === false) {
        try {
          const card1 = await getCard()
          const card2 = await getCard()
          setPlayerCards([card1, card2, ""])

          const dealerCard1 = await getCard()
          const dealerCard2 = await getCard()
          setDealerCards([dealerCard1, dealerCard2, ""])

          setTurn("DEALER")
        } catch (error) {
          // Handle errors if any
          console.error("Error initializing game:", error)
        }
      }
    }

    initializeCard()
  }, [turn, addCard])

  useEffect(() => {
    const addCard = async () => {
      if (callState === true && round === "ROUND1") {
        const newCard1 = await getCard()
        setPlayerCards((prevCard: string[]) => [
          prevCard[0],
          prevCard[1],
          newCard1,
        ])
        const newCard2 = await getCard()
        setDealerCards((prevCard: string[]) => [
          prevCard[0],
          prevCard[1],
          newCard2,
        ])
      }
    }
    addCard()
    setAddCard(true)
    setRound("ROUND2")
    setPlayerChoice("NONE")
    setDealerChoice("NONE")
    if (turn === "DEALER") {
      setTurn("PLAYER")
    } else if (turn === "PLAYER") {
      setTurn("DEALER")
    }
    setCallState(false)
  }, [callState])

  useEffect(() => {
    if (callState === true && round === "ROUND2") {
      let maxDealerSum = 0
      let maxPlayerSum = 0
      for (let i = 0; i < 3; i++) {
        maxDealerSum += Number(dealerCards[i])
        maxPlayerSum += Number(dealerCards[i])
      }
      maxDealerSum -= Math.min(
        Number(dealerCards[0]),
        Number(dealerCards[1]),
        Number(dealerCards[2]),
      )
      maxPlayerSum -= Math.min(
        Number(playerCards[0]),
        Number(playerCards[1]),
        Number(playerCards[2]),
      )

      if (maxDealerSum > maxPlayerSum) {
        setWinner("DEALER")
      } else {
        setWinner("PLAYER")
      }
      setCallState(false)
      setEndGame(true)
    }
  }, [callState])

  useEffect(() => {
    setTotalBet((prevTotalBet) => prevTotalBet + playerBet)
  }, [playerBet])

  useEffect(() => {
    setTotalBet((prevTotalBet) => prevTotalBet + dealerBet)
  }, [dealerBet])

  useEffect(() => {
    if (winner === "DEALER") {
      setDealerCoin((prevDealerCoin: number) => prevDealerCoin + totlalBet)
    }
    if (winner === "PLAYER") {
      setPlayerCoin((prevPlayerCoin: number) => prevPlayerCoin + totlalBet)
    }
    setPlayerBet(0)
    setDealerBet(0)
    setAddCard(false)
    setPlayerChoice("NONE")
    setDealerChoice("NONE")
    setPlayerCards(["", "", ""])
    setDealerCards(["", "", ""])
    setRound("ROUND1")
    setCallState(false)
    setTotalBet(0)
    setPlayerTotalBet(0)
    setDealerTotalBet(0)
    setWinner("")
    setEndGame(false)
    setTurn("ENTERING")
  }, [endGame])

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
        dealerTotalBet={dealerTotalBet}
        playerTotalBet={playerTotalBet}
        setDealerTotalBet={setDealerTotalBet}
        setWinner={setWinner}
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
        playerTotalBet={playerTotalBet}
        dealerTotalBet={dealerTotalBet}
        setPlayerTotalBet={setPlayerTotalBet}
        setWinner={setWinner}
      />
    </div>
  )
}

export { MainPage }
