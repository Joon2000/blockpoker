import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'Call' : ActorMethod<[Principal], undefined>,
  'Fold' : ActorMethod<[Principal], undefined>,
  'Raise' : ActorMethod<[Principal], undefined>,
  'TotalInitialization' : ActorMethod<[], undefined>,
  'findBiggestCardSum' : ActorMethod<[Array<bigint>], bigint>,
  'getCounterpartCards' : ActorMethod<[Principal], Array<bigint>>,
  'getDecryptedCards' : ActorMethod<[Principal, Array<bigint>], undefined>,
  'getEncryptedCardDeck' : ActorMethod<[], Array<string>>,
  'getEncryptedPlayerCards' : ActorMethod<[Principal], Array<string>>,
  'getGameData' : ActorMethod<
    [Principal],
    [
      bigint,
      bigint,
      string,
      boolean,
      bigint,
      bigint,
      bigint,
      string,
      string,
      bigint,
      bigint,
      boolean,
      boolean,
    ]
  >,
  'getPlayerInternetIdentityPrincipals' : ActorMethod<
    [Principal],
    Array<[] | [Principal]>
  >,
  'handleCall' : ActorMethod<[], undefined>,
  'initializeGame' : ActorMethod<[], undefined>,
  'playerReady' : ActorMethod<[Principal, Principal], string>,
  'storeEncryptedCardDeck' : ActorMethod<[Array<string>], undefined>,
  'storeEncryptedPlayerCards' : ActorMethod<
    [Principal, Array<string>],
    undefined
  >,
}
