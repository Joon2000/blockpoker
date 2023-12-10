import React, { useEffect, useState } from "react"
import { PokerTable } from "./PokerTable"
import { PlayerButton } from "./PlayerButton"
import { Box, Button } from "@mui/material"
import { brown } from "@mui/material/colors"
import { useInterval } from "../hook/useInterval"
import { Turn } from "../../src/declarations/Turn"
import { Choice } from "frontend/Type"
import { BiCommentDots } from "react-icons/bi"
import { BiMehBlank } from "react-icons/bi"
import { ibe_decrypt, ibe_encrypt } from "../utils/vetKeys"

const PlayerPage = ({ wallet }) => {
  const [player, setPlayer] = useState<string>("NONE")
  const [playerTotalBettingAmount, setPlayerTotalBettingAmount] =
    useState<number>(0)
  const [playerCurrentBettingAmount, setPlayerCurrentBettingAmount] =
    useState<number>(0)
  const [playerBettingChoice, setPlayerBettingChoice] = useState<string>("NONE")
  const [isBothPlayerReady, setIsBothPlayerReady] = useState<boolean>(false)
  const [totalAmountBetting, setTotalAmountBetting] = useState<number>(0)
  const [counterpartTotalBettingAmount, setCounterpartTotalBettingAmount] =
    useState<number>(0)
  const [counterpartCurrentBettingAmount, setCounterpartCurrentBettingAmount] =
    useState<number>(0)
  const [counterpartBettingChoice, setCounterPartBettingChoice] =
    useState<string>("NONE")
  const [gameTurn, setGameTurn] = useState<string>("NEITHER")
  const [playerCards, setPlayerCards] = useState<number[]>([null, null, null])
  const [playerTotalChips, setPlayerTotalChips] = useState<number>(0)
  const [counterpartTotalChips, setcounterTotalChips] = useState<number>(0)
  const [iIPrincipal, setIIPrincipal] = useState<string>("")
  const [isAllCall, setIsAllCall] = useState<boolean>(false)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [initializeSwitch, setInitializeSwitch] = useState<boolean>(false)

  const fetchUserData = async () => {
    const data = await Turn.getGameData(wallet.principal)
    const cards = await Turn.getEncryptedPlayerCards(wallet.principal)
    for (let i = 0; i < 3; i++) {
      if (String(cards[i]) !== "") {
        cards[i] = await decryptNumber(String(cards[i]))
      } else {
        cards[i] = "0"
      }
    }
    return [data, cards]
  }

  useInterval(async () => {
    if (player != "NONE" && wallet.principal) {
      const [data, cards] = await fetchUserData()
      setPlayerTotalBettingAmount(Number(data[0]))
      setPlayerCurrentBettingAmount(Number(data[1]))
      setPlayerBettingChoice(String(data[2]))
      setIsBothPlayerReady(Boolean(data[3]))
      setTotalAmountBetting(Number(data[4]))
      setCounterpartTotalBettingAmount(Number(data[5]))
      setCounterpartCurrentBettingAmount(Number(data[6]))
      setCounterPartBettingChoice(String(data[7]))
      setGameTurn(String(data[8]))
      setPlayerTotalChips(Number(data[9]))
      setcounterTotalChips(Number(data[10]))
      setPlayerCards([Number(cards[0]), Number(cards[1]), Number(cards[2])])
      setIsAllCall(Boolean(data[11]))
      setIsEnd(Boolean(data[12]))
      setInitializeSwitch(Boolean(data[13]))
      return
    } else {
      return
    }
  }, 2000)

  async function sendDecryptedCards(cards) {
    await Turn.getDecryptedCards(wallet.principal, cards)
  }

  useEffect(() => {
    if (isEnd === true) {
      sendDecryptedCards(playerCards)
    }
  }, [isEnd])

  async function clickInitializeGame(e: { preventDefault: any }) {
    e.preventDefault
    await Turn.TotalInitialization()
    setIIPrincipal("")
    console.log("Game Initialized")
  }

  //Functions for Dealer

  function shuffle(array: number[]) {
    for (let index = array.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1))

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = array[index]
      array[index] = array[randomPosition]
      array[randomPosition] = temporary
    }
    return array
  }

  async function fetchPlayerInternetIdentityPrincipals() {
    const [player1IIPrincipal, player2IIPrincipal] =
      await Turn.getPlayerInternetIdentityPrincipals(wallet.principal)
    return [player1IIPrincipal, player2IIPrincipal]
  }

  async function encryptNumber(number, iIPrincipal): Promise<string> {
    const encryptedResult = await ibe_encrypt(number.toString(), iIPrincipal)
    return encryptedResult
  }

  async function decryptNumber(encryptedNumber): Promise<string> {
    const encryptedResult = await ibe_decrypt(encryptedNumber)
    return encryptedResult
  }

  async function storeEncryptedCardDeck(randomDeck) {
    Promise.all(
      randomDeck.map(async (num, i) => {
        const encryptedNumber = await encryptNumber(num, iIPrincipal)
        return encryptedNumber
      }),
    )
      .then((encryptedNumbers) => {
        const encryptedCardDeck: string[] = encryptedNumbers
        Turn.storeEncryptedCardDeck(encryptedCardDeck)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function encryptPlayerCards(
    cards,
    player1InternetIdentityPrincipal,
    player2InternetIdentityPrincipal,
  ) {
    if (!isAllCall) {
      const player1EncryptedCards = [
        await encryptNumber(cards[0], player1InternetIdentityPrincipal),
        await encryptNumber(cards[1], player1InternetIdentityPrincipal),
      ]
      const player2EncryptedCards = [
        await encryptNumber(cards[2], player2InternetIdentityPrincipal),
        await encryptNumber(cards[3], player2InternetIdentityPrincipal),
      ]
      Turn.storeEncryptedPlayerCards(
        player1InternetIdentityPrincipal,
        player1EncryptedCards,
      )
      Turn.storeEncryptedPlayerCards(
        player2InternetIdentityPrincipal,
        player2EncryptedCards,
      )
    } else {
      const player1EncryptedCards = [
        await encryptNumber(cards[0], player1InternetIdentityPrincipal),
      ]
      const player2EncryptedCards = [
        await encryptNumber(cards[1], player2InternetIdentityPrincipal),
      ]
      Turn.storeEncryptedPlayerCards(
        player1InternetIdentityPrincipal,
        player1EncryptedCards,
      )
      Turn.storeEncryptedPlayerCards(
        player2InternetIdentityPrincipal,
        player2EncryptedCards,
      )
    }
  }

  async function getEncryptedCardDeck() {
    return await Turn.getEncryptedCardDeck()
  }

  useEffect(() => {
    if (player === "DEALER" && iIPrincipal && isBothPlayerReady) {
      const initialDeck = Array.from({ length: 52 }, (_, index) => index + 1)
      let randomDeck = shuffle(initialDeck)
      console.log(randomDeck[0], randomDeck[1], randomDeck[2], randomDeck[3])
      const playerInternetIdentityPrincipals =
        fetchPlayerInternetIdentityPrincipals()
      const player1InternetIdentityPrincipal =
        playerInternetIdentityPrincipals[0]
      const player2InternetIdentityPrincipal =
        playerInternetIdentityPrincipals[1]
      encryptPlayerCards(
        randomDeck,
        player1InternetIdentityPrincipal,
        player2InternetIdentityPrincipal,
      )
      storeEncryptedCardDeck(randomDeck)
      //보안을 위해 프론트에 randomDeck 초기화
      randomDeck = Array.from({ length: 52 }, (_, index) => index + 1)
    }
  }, [initializeSwitch, isBothPlayerReady])

  //Add one more card
  useEffect(() => {
    const playerInternetIdentityPrincipals =
      fetchPlayerInternetIdentityPrincipals()
    const player1InternetIdentityPrincipal = playerInternetIdentityPrincipals[0]
    const player2InternetIdentityPrincipal = playerInternetIdentityPrincipals[1]
    const encryptedCardDeck = getEncryptedCardDeck()
    const number1 = decryptNumber(encryptedCardDeck[4])
    const number2 = decryptNumber(encryptedCardDeck[5])
    encryptPlayerCards(
      [number1, number2],
      player1InternetIdentityPrincipal,
      player2InternetIdentityPrincipal,
    )
  }, [isAllCall])

  return (
    <div style={{ marginTop: "40px" }}>
      <Box
        sx={{
          width: 1000,
          height: 700,
          borderRadius: 1,
          bgcolor: brown[100],
        }}
      >
        <div style={{ marginLeft: "465px" }}>
          <BiMehBlank size="70" />
          {player !== gameTurn && <BiCommentDots size="70" />}
        </div>
        <PokerTable
          playerTotalBettingAmount={playerTotalBettingAmount}
          playerCurrentBettingAmount={playerCurrentBettingAmount}
          playerBettingChoice={playerBettingChoice}
          totalAmountBetting={totalAmountBetting}
          counterpartTotalBettingAmount={counterpartTotalBettingAmount}
          counterpartCurrentBettingAmount={counterpartCurrentBettingAmount}
          counterpartBettingChoice={counterpartBettingChoice}
          gameTurn={gameTurn}
          playerCards={playerCards}
          playerTotalChips={playerTotalChips}
          counterpartTotalChips={counterpartTotalChips}
          wallet={wallet}
        />
        <PlayerButton
          wallet={wallet}
          setPlayer={setPlayer}
          isBothPlayerReady={isBothPlayerReady}
          gameTurn={gameTurn}
          player={player}
          iIPrincipal={iIPrincipal}
          setIIPrincipal={setIIPrincipal}
        />
      </Box>
      <Button
        variant="contained"
        onClick={clickInitializeGame}
        size="large"
        color="error"
      >
        Initialize Game
      </Button>
    </div>
  )
}

export { PlayerPage }
