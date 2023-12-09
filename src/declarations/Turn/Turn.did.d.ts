import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'Call' : ActorMethod<[string], undefined>,
  'Fold' : ActorMethod<[string], undefined>,
  'Raise' : ActorMethod<[string], undefined>,
  'TotalInitialization' : ActorMethod<[], undefined>,
  'findBiggestCardSum' : ActorMethod<[Array<bigint>], bigint>,
  'getCounterpartCards' : ActorMethod<[string], Array<bigint>>,
  'getDecryptedCards' : ActorMethod<[string, Array<bigint>], undefined>,
  'getEncryptedCardDeck' : ActorMethod<[], Array<string>>,
  'getEncryptedPlayerCards' : ActorMethod<[string], Array<string>>,
  'getGameData' : ActorMethod<
    [string],
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
      boolean,
    ]
  >,
  'getPlayerInternetIdentityPrincipals' : ActorMethod<
    [string],
    Array<[] | [Principal]>
  >,
  'handleCall' : ActorMethod<[], undefined>,
  'initializeGame' : ActorMethod<[], undefined>,
  'playerReady' : ActorMethod<[string, string], string>,
  'storeEncryptedCardDeck' : ActorMethod<[Array<string>], undefined>,
  'storeEncryptedPlayerCards' : ActorMethod<[string, Array<string>], undefined>,
}
