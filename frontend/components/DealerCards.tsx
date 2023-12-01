import React from "react"
import { CardBack } from "./CardBack"
import { Grid } from "@mui/material"

const DealerCards = () => {
  return (
    <div style={{ position: "absolute", left: "32%", top: "10px" }}>
      <Grid container spacing={4}>
        <Grid item xs={6} md={4}>
          <CardBack />
        </Grid>
        <Grid item xs={6} md={4}>
          <CardBack />
        </Grid>
        <Grid item xs={6} md={4}>
          <CardBack />
        </Grid>
      </Grid>
    </div>
  )
}

export { DealerCards }
