import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"

const TrumpCard = ({ cardNumber, order, playerCrpytoNumber }) => {


  function decrypt_card_number_for_player(encrypted_number : number, order : number , playerCryptoNum : number) {
    let decrypted_number = (encrypted_number - playerCryptoNum) / (12 * (order + 3) + 45);
    return decrypted_number;
};
  let shapeNumber : number ;
  let number : number;

  if(playerCrpytoNumber == 0) {
    shapeNumber = 100;
    number = 100;
  } else {
    let decrypted_number = decrypt_card_number_for_player(Number(cardNumber), Number(order), playerCrpytoNumber);
    shapeNumber = Math.floor(decrypted_number / 13);
    number = decrypted_number % 13 + 1;
  }

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
