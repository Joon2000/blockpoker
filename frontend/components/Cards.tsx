import React from "react"

const Cards = ({ cards, addCard }) => {
  return (
    <div>
      {addCard ? (
        <div>
          <div>{cards[0]}</div>
          <div>{cards[1]}</div>
        </div>
      ) : (
        <div>
          <div>{cards[0]}</div>
          <div>{cards[1]}</div>
          <div>{cards[2]}</div>
        </div>
      )}
    </div>
  )
}

export { Cards }
