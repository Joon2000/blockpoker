import { getRandomNumber } from "./randomNumber"
import { Choice } from "frontend/Type"

export function getDealerChoice(choice: Choice): Choice {
  const randomNumber = getRandomNumber()

  if (randomNumber <= 5) {
    return "CALL"
  } else if (randomNumber <= 8) {
    return "RAISE"
  } else {
    return "FOLD"
  }
}
