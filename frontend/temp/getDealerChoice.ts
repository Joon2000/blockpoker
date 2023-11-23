import { getRandomNumber } from "./randomNumber"

export function getDealerChoice(choice: Choice): Choice {
  const randomNumber = getRandomNumber()
  if (choice === "NONE") {
    if (randomNumber <= 5) {
      return "CALL"
    } else if (randomNumber <= 8) {
      return "RAISE"
    } else {
      return "FOLD"
    }
  }
}
