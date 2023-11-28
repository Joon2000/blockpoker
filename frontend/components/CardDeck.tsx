import React from "react"
import { CardBack } from "./CardBack"

const CardDeck = () => {
  const i = Array.from({ length: 10 }, (_, index) => index)

  return (
    <div style={{ position: "absolute", left: "10px", top: "200px" }}>
      {i.map((n) => (
        <div
          key={n}
          style={{
            position: "absolute",
            left: `${10 + 1 * n}px`,
            top: `${200 + 1 * n}%`,
          }}
        >
          <CardBack />
        </div>
      ))}
    </div>
  )
}

export { CardDeck }
