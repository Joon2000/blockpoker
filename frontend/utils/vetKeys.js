import { createActor, app_backend } from "../../src/declarations/app_backend"
import * as vetkd from "ic-vetkd-utils"
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent, Actor } from "@dfinity/agent"
import { Principal } from "@dfinity/principal"

let fetched_symmetric_key = null
let app_backend_actor = app_backend
// let app_backend_principal = await Actor.agentOf(
//   app_backend_actor,
// ).getPrincipal()

export async function internetIdentityLogin() {
  let app_backend_principal = await Actor.agentOf(
    app_backend_actor,
  ).getPrincipal()
  let authClient = await AuthClient.create()
  await new Promise((resolve) => {
    authClient.login({
      identityProvider: `http://127.0.0.1:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`,
      onSuccess: resolve,
    })
  })
  // At this point we're authenticated, and we can get the identity from the auth client:
  const identity = authClient.getIdentity()
  // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
  const agent = new HttpAgent({ identity })
  // Using the interface description of our webapp, we create an actor that we use to call the service methods. We override the global actor, such that the other button handler will automatically use the new actor with the Internet Identity provided delegation.
  app_backend_actor = createActor(process.env.APP_BACKEND_CANISTER_ID, {
    agent,
  })
  app_backend_principal = identity.getPrincipal()

  fetched_symmetric_key = null

  return app_backend_principal
}

export async function ibe_encrypt(number, principalText) {
  const pk_bytes_hex = await app_backend_actor.ibe_encryption_key()
  const message_encoded = new TextEncoder().encode(number)
  const seed = window.crypto.getRandomValues(new Uint8Array(32))
  let ibe_principal = Principal.fromText(principalText)
  const ibe_ciphertext = vetkd.IBECiphertext.encrypt(
    hex_decode(pk_bytes_hex),
    ibe_principal.toUint8Array(),
    message_encoded,
    seed,
  )

  return hex_encode(ibe_ciphertext.serialize())
}

export async function ibe_decrypt(ibe_ciphertext_hex) {
  const tsk_seed = window.crypto.getRandomValues(new Uint8Array(32))
  const tsk = new vetkd.TransportSecretKey(tsk_seed)
  const ek_bytes_hex =
    await app_backend_actor.encrypted_ibe_decryption_key_for_caller(
      tsk.public_key(),
    )
  const pk_bytes_hex = await app_backend_actor.ibe_encryption_key()

  const k_bytes = tsk.decrypt(
    hex_decode(ek_bytes_hex),
    hex_decode(pk_bytes_hex),
    app_backend_principal.toUint8Array(),
  )

  const ibe_ciphertext = vetkd.IBECiphertext.deserialize(
    hex_decode(ibe_ciphertext_hex),
  )
  const ibe_plaintext = ibe_ciphertext.decrypt(k_bytes)
  return new TextDecoder().decode(ibe_plaintext)
}

const hex_decode = (hexString) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
const hex_encode = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "")
