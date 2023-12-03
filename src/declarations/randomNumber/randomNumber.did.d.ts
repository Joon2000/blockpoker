import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'generateCardDeck' : ActorMethod<[], Array<bigint>>,
  'generateRandomNumber' : ActorMethod<[], [] | [bigint]>,
  'getNumber' : ActorMethod<[], bigint>,
}
