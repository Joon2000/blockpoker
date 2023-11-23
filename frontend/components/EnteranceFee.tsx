import React from "react"

const EnteranceFee = ({ setTurn }) => {
  function sendFee(e: { preventDefault: () => void }) {
    e.preventDefault()
    console.log("fee send")
    setTurn("STARTING")
  }
  return (
    <div>
      <h3>Pay Enterance Fee</h3>
      Enterance Fee: 1 ICP
      <button onClick={sendFee}>pay</button>
    </div>
  )
}

export { EnteranceFee }
