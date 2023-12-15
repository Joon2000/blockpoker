import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"

const TrumpCard = ({ 
  cardNumber, 
  order, 
  currentPlayerCrpytoNumber,
 }) => {
  // console.log("cardNumber", cardNumber);
  // console.log("currentPlayerCrpytoNumber", currentPlayerCrpytoNumber);
  // console.log("");

  function decrypt_card_number_for_player(encrypted_number : number, order : number , playerCryptoNum : number) {
    let decrypted_number = (encrypted_number - playerCryptoNum) / (12 * (order + 3) + 45);
    return decrypted_number;
  };

  let shapeNumber : number ;
  let number : number;

  if (cardNumber > 52 && Number(currentPlayerCrpytoNumber) == 0) {
    shapeNumber = 100;
    number = 100;
  } else if (cardNumber > 52 && Number(currentPlayerCrpytoNumber) != 0 ) {
    // notyet decrypted
    let decrypted_number = decrypt_card_number_for_player(Number(cardNumber), Number(order), currentPlayerCrpytoNumber);
    shapeNumber = Math.floor(decrypted_number / 13);
    number = decrypted_number % 13 + 1;
  } else if (cardNumber <= 52) {
    shapeNumber = Math.floor(cardNumber / 13);
    number = cardNumber % 13 + 1;
  };


  let shape = "spades";
  switch (shapeNumber) {
    case (0): 
      shape="spades";
      break;
    case (1): 
      shape="clubs";
      break;
    case (2): 
      shape="diamonds";
      break;
    case (3): 
      shape="hearts";
      break;
    case (100):
      shape="back";
      break;
  };

  return (
    <div>
      {/* <p>{number.toString()}</p> */}
      {shapeNumber == 100 ? 
      <img
        src={`/frontend/assets/trumpCards/cardBack.png`}
        alt={`cardBack.png`}
        className="card--image"
      />
      :
      <img
        src={`/frontend/assets/trumpCards/${number.toString()}_of_${shape}.png`}
        alt={`${number.toString()}_of_${shape}.png`}
        className="card--image"
      />
      }
    </div>
  )
}

export { TrumpCard }
