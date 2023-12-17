import { Grid, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { brown } from "@mui/material/colors"
import React , { useEffect, useState } from "react"
import { StateBox } from "./StateBox"
import { MoneyBox } from "./MoneyBox"
import { PlayerCards } from "./PlayerCards"
import { CardDeck } from "./CardDeck"
import { poker} from "../../src/declarations/poker"

const GameEndPage = ({
  wallet,
  gameTurn,
  totalBetAmount,
  playerInfo,
  playerInfoArray,
  playerCrpytoNumber,
  winner,
  updateState,
}) => { 
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  async function settleUp(e: { preventDefault: any }) {
    e.preventDefault
    setIsButtonDisabled(true);
    await poker.settleUpGame();
    setIsButtonDisabled(false);
    updateState();

    console.log("settle up game")
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if (winner == null ){
      setOpen(false);
    } else {
      setOpen(true);
    }
  },[winner])


  return (
    <Box
      sx={{
        // width: 950,
        minHeight: 600,
        borderRadius: 1,
        bgcolor: brown[200],
        pt : 5,
      }}
    >
      <Grid container spacing={5} id={"Top Line"}>
        <Grid item xs={4}>
         
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+2)%4]!=null &&
          <PlayerCards 
            player={playerInfoArray[(Number(playerInfo.playerOrder)+2)%4]}
            wallet={wallet}
            gameTurn={gameTurn}
            currentPlayerCrpytoNumber={0}
          />}
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>
      <Grid container spacing={5} id={"Middle Line"}>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+3)%4]!=null &&
          <PlayerCards 
            player={playerInfoArray[(Number(playerInfo.playerOrder)+3)%4]}
            wallet={wallet}
            gameTurn={gameTurn}
            currentPlayerCrpytoNumber={0}
          />}
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <MoneyBox totalBetAmount={totalBetAmount}/>
            <CardDeck />   
          </Box>
                 
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+1)%4]!=null &&
          <PlayerCards 
            player={playerInfoArray[(Number(playerInfo.playerOrder)+1)%4]}
            wallet={wallet}
            gameTurn={gameTurn}
            currentPlayerCrpytoNumber={0}
          />}
        </Grid>
      </Grid>
      <Grid container spacing={5} id={"Bottom Line"}>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && <StateBox playerInfo={playerInfo}/>}
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+0)%4]!=null &&
            <PlayerCards 
            player={playerInfoArray[Number(playerInfo.playerOrder)%4]}
            wallet={wallet}
            gameTurn={gameTurn}
            currentPlayerCrpytoNumber={playerCrpytoNumber}
            />
          }
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
         <Button
            variant="contained"
            onClick={settleUp}
            size="large"
            color="primary"
            disabled={isButtonDisabled}
          > Setlle Up </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Winner : {winner}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export { GameEndPage }
