import React from "react"

const EnteranceFee = ({ setTurn, setCoin, setBet, setPayed }) => {
  function sendFee(e: { preventDefault: () => void }) {
    e.preventDefault()
    console.log("fee send")
    setCoin((prevCoin: number): number => prevCoin - 1)
    setBet(1)
    setPayed(1)
    //function seding fee to canister
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
