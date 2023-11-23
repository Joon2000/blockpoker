import React from "react"

const Cards = ({ playerCards, addCard }) => {
  return (
    <div>
      {addCard ? (
        <div>
          <div>{playerCards[0]}</div>
          <div>{playerCards[1]}</div>
          <div>{playerCards[2]}</div>
        </div>
      ) : (
        <div>
          <div>{playerCards[0]}</div>
          <div>{playerCards[1]}</div>
        </div>
      )}
    </div>
  )
}

export { Cards }
