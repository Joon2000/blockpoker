import { Grid, Box, Button } from "@mui/material"
import { brown } from "@mui/material/colors"
import React , { useState } from "react"
import { StateBoxRefactor } from "./StateBoxRefactor"
import { MoneyBox } from "./MoneyBox"
import { PlayerCards } from "./PlayerCards"
import { CardDeck } from "./CardDeck"
import { PokerGameButton } from "./PokerGameButton"
import * as vetkd from "ic-vetkd-utils";
import { vet_key} from "../../src/declarations/vet_key"
import { HttpAgent, Actor } from "@dfinity/agent";

const PokerTable = ({
  wallet,
  totalBetAmount,
  playerInfo,
  playerInfoArray,
  playerCrpytoNumber,
  updateState,
}) => { 

  const hex_decode = (hexString) =>
    Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  const hex_encode = (bytes) =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

  async function get_aes_256_gcm_key() {
    let app_backend_principal = await Actor.agentOf(vet_key).getPrincipal();
    const seed = window.crypto.getRandomValues(new Uint8Array(32));
    console.log("seed", seed)
    const tsk : any = new vetkd.TransportSecretKey(seed);
    console.log("tsk", tsk)
    const ek_bytes_hex = await vet_key.encrypted_symmetric_key_for_caller(tsk.public_key());
    console.log("ek_bytes_hex", ek_bytes_hex)
    const pk_bytes_hex = await vet_key.symmetric_key_verification_key();
    console.log("pk_bytes_hex", pk_bytes_hex)
    return tsk.decrypt_and_hash(
      hex_decode(ek_bytes_hex),
      hex_decode(pk_bytes_hex),
      app_backend_principal.toUint8Array(),
      32,
      new TextEncoder().encode("aes-256-gcm")
    );
  };

  async function aes_gcm_encrypt(message, rawKey) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bits; unique per message
    const aes_key = await window.crypto.subtle.importKey("raw", rawKey, "AES-GCM", false, ["encrypt"]);
    const message_encoded = new TextEncoder().encode(message);
    const ciphertext_buffer = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      aes_key,
      message_encoded
    );
    const ciphertext = new Uint8Array(ciphertext_buffer);
    var iv_and_ciphertext = new Uint8Array(iv.length + ciphertext.length);
    iv_and_ciphertext.set(iv, 0);
    iv_and_ciphertext.set(ciphertext, iv.length);
    return hex_encode(iv_and_ciphertext);
  };

  async function test_key( ) {
    let message = "message"
    const aes_256_key = await get_aes_256_gcm_key();
    let fetched_symmetric_key = aes_256_key;
    const ciphertext = await aes_gcm_encrypt(message, fetched_symmetric_key);
  
    console.log("cipertext", ciphertext)
  }


  return (
    <Box
      sx={{
        // width: 950,
        minHeight: 550,
        borderRadius: 1,
        bgcolor: brown[200],
      }}
    >
      <Grid container spacing={5} id={"Top Line"}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={test_key}
            size="large"
            color="primary"
            // disabled={isButtonDisabled}
          > test_key </Button>

        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+2)%4]!=null &&
          <PlayerCards 
            player={playerInfoArray[(Number(playerInfo.playerOrder)+2)%4]}
            playerCrpytoNumber={0}
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
            playerCrpytoNumber={0}
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
            playerCrpytoNumber={0}
          />}
        </Grid>
      </Grid>
      <Grid container spacing={5} id={"Bottom Line"}>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && <StateBoxRefactor playerInfo={playerInfo}/>}
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {playerInfo!=null && playerInfoArray[(Number(playerInfo.playerOrder)+0)%4]!=null &&
            <PlayerCards 
            player={playerInfoArray[Number(playerInfo.playerOrder)%4]}
            playerCrpytoNumber={playerCrpytoNumber}
            />
          }
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
         <PokerGameButton wallet={wallet} updateState={updateState}/> 
        </Grid>
      </Grid>
    </Box>
  )
}

export { PokerTable }
