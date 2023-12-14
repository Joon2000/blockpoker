import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"

const TrumpCard = ({ cardNumber }) => {
  let shapeNumber = Math.floor(cardNumber / 13);
  let number = cardNumber % 13 + 1;
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
  };

  return (
    <div>
      <p>{cardNumber.toString()}</p>
      <img
        src={`/frontend/assets/trumpCards/${number.toString()}_of_${shape}.png`}
        alt={`${number.toString()}_of_${shape}.png`}
        className="card--image"
      />
      
    </div>
  )
}

export { TrumpCard }
