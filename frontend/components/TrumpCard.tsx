import React, { useEffect, useState } from "react"
import { Box, Typography, Card } from "@mui/material"
import { brown } from "@mui/material/colors";
import cardBack from "../assets/pngegg.png"
import card_1_of_clubs from "../assets/trumpCards/card_1_of_clubs.png"
import card_2_of_clubs from "../assets/trumpCards/card_2_of_clubs.png"
import card_3_of_clubs from "../assets/trumpCards/card_3_of_clubs.png"
import card_4_of_clubs from "../assets/trumpCards/card_4_of_clubs.png"
import card_5_of_clubs from "../assets/trumpCards/card_5_of_clubs.png"
import card_6_of_clubs from "../assets/trumpCards/card_6_of_clubs.png"
import card_7_of_clubs from "../assets/trumpCards/card_7_of_clubs.png"
import card_8_of_clubs from "../assets/trumpCards/card_8_of_clubs.png"
import card_9_of_clubs from "../assets/trumpCards/card_9_of_clubs.png"
import card_10_of_clubs from "../assets/trumpCards/card_10_of_clubs.png"
import card_11_of_clubs from "../assets/trumpCards/card_11_of_clubs.png"
import card_12_of_clubs from "../assets/trumpCards/card_12_of_clubs.png"
import card_13_of_clubs from "../assets/trumpCards/card_13_of_clubs.png"
import card_1_of_hearts from "../assets/trumpCards/card_1_of_hearts.png"
import card_2_of_hearts from "../assets/trumpCards/card_2_of_hearts.png"
import card_3_of_hearts from "../assets/trumpCards/card_3_of_hearts.png"
import card_4_of_hearts from "../assets/trumpCards/card_4_of_hearts.png"
import card_5_of_hearts from "../assets/trumpCards/card_5_of_hearts.png"
import card_6_of_hearts from "../assets/trumpCards/card_6_of_hearts.png"
import card_7_of_hearts from "../assets/trumpCards/card_7_of_hearts.png"
import card_8_of_hearts from "../assets/trumpCards/card_8_of_hearts.png"
import card_9_of_hearts from "../assets/trumpCards/card_9_of_hearts.png"
import card_10_of_hearts from "../assets/trumpCards/card_10_of_hearts.png"
import card_11_of_hearts from "../assets/trumpCards/card_11_of_hearts.png"
import card_12_of_hearts from "../assets/trumpCards/card_12_of_hearts.png"
import card_13_of_hearts from "../assets/trumpCards/card_13_of_hearts.png"
import card_1_of_spades from "../assets/trumpCards/card_1_of_spades.png"
import card_2_of_spades from "../assets/trumpCards/card_2_of_spades.png"
import card_3_of_spades from "../assets/trumpCards/card_3_of_spades.png"
import card_4_of_spades from "../assets/trumpCards/card_4_of_spades.png"
import card_5_of_spades from "../assets/trumpCards/card_5_of_spades.png"
import card_6_of_spades from "../assets/trumpCards/card_6_of_spades.png"
import card_7_of_spades from "../assets/trumpCards/card_7_of_spades.png"
import card_8_of_spades from "../assets/trumpCards/card_8_of_spades.png"
import card_9_of_spades from "../assets/trumpCards/card_9_of_spades.png"
import card_10_of_spades from "../assets/trumpCards/card_10_of_spades.png"
import card_11_of_spades from "../assets/trumpCards/card_11_of_spades.png"
import card_12_of_spades from "../assets/trumpCards/card_12_of_spades.png"
import card_13_of_spades from "../assets/trumpCards/card_13_of_spades.png"
import card_1_of_diamonds from "../assets/trumpCards/card_1_of_diamonds.png"
import card_2_of_diamonds from "../assets/trumpCards/card_2_of_diamonds.png"
import card_3_of_diamonds from "../assets/trumpCards/card_3_of_diamonds.png"
import card_4_of_diamonds from "../assets/trumpCards/card_4_of_diamonds.png"
import card_5_of_diamonds from "../assets/trumpCards/card_5_of_diamonds.png"
import card_6_of_diamonds from "../assets/trumpCards/card_6_of_diamonds.png"
import card_7_of_diamonds from "../assets/trumpCards/card_7_of_diamonds.png"
import card_8_of_diamonds from "../assets/trumpCards/card_8_of_diamonds.png"
import card_9_of_diamonds from "../assets/trumpCards/card_9_of_diamonds.png"
import card_10_of_diamonds from "../assets/trumpCards/card_10_of_diamonds.png"
import card_11_of_diamonds from "../assets/trumpCards/card_11_of_diamonds.png"
import card_12_of_diamonds from "../assets/trumpCards/card_12_of_diamonds.png"
import card_13_of_diamonds from "../assets/trumpCards/card_13_of_diamonds.png"




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
    number = 0;
  } else if (cardNumber > 52 && Number(currentPlayerCrpytoNumber) != 0 ) {
    // notyet decrypted
    let decrypted_number = decrypt_card_number_for_player(Number(cardNumber), Number(order), currentPlayerCrpytoNumber);
    shapeNumber = Math.floor(decrypted_number / 13);
    number = decrypted_number % 13 + 1;
  } else if (cardNumber <= 52) {
    shapeNumber = Math.floor(cardNumber / 13);
    number = cardNumber % 13;
  };


  let cardArray = 
  [
    [card_1_of_spades, card_2_of_spades, card_3_of_spades, card_4_of_spades, card_5_of_spades, card_6_of_spades, card_7_of_spades, card_8_of_spades, card_9_of_spades, card_10_of_spades, card_11_of_spades, card_12_of_spades, card_13_of_spades],
    [card_1_of_clubs, card_2_of_clubs, card_3_of_clubs, card_4_of_clubs, card_5_of_clubs, card_6_of_clubs, card_7_of_clubs, card_8_of_clubs, card_9_of_clubs, card_10_of_clubs, card_11_of_clubs, card_12_of_clubs, card_13_of_clubs],
    [card_1_of_diamonds, card_2_of_diamonds, card_3_of_diamonds, card_4_of_diamonds, card_5_of_diamonds, card_6_of_diamonds, card_7_of_diamonds, card_8_of_diamonds, card_9_of_diamonds, card_10_of_diamonds, card_11_of_diamonds, card_12_of_diamonds, card_13_of_diamonds],
    [card_1_of_hearts, card_2_of_hearts, card_3_of_hearts, card_4_of_hearts, card_5_of_hearts, card_6_of_hearts, card_7_of_hearts, card_8_of_hearts, card_9_of_hearts, card_10_of_hearts, card_11_of_hearts, card_12_of_hearts, card_13_of_hearts]
  ]
  // switch (shapeNumber) {
  //   case (0): 
  //     shape="spades";
  //     break;
  //   case (1): 
  //     shape="clubs";
  //     break;
  //   case (2): 
  //     shape="diamonds";
  //     break;
  //   case (3): 
  //     shape="hearts";
  //     break;
  //   case (100):
  //     shape="back";
  //     break;
  // };

  return (
    <Box>
      {/* <Card sx={{width: 110, height: 180, bgcolor: brown[300], boxShadow:10}}>
        <Typography>{shape} {number.toString()}</Typography>
      </Card> */}

      {shapeNumber == 100 ? 
      <img src={cardBack} alt="card_back" className="card--image" />
      :
      <img
        src={cardArray[shapeNumber][number]}
        alt={cardArray[shapeNumber][number]}
        className="card--image"
      />
      }
      

    </Box>
      
      
  )
}

export { TrumpCard }
