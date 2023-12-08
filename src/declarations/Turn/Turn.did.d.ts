import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'Call' : ActorMethod<[string], undefined>,
  'Fold' : ActorMethod<[string], undefined>,
  'Raise' : ActorMethod<[string], undefined>,
  'TotalInitialization' : ActorMethod<[], undefined>,
  'addCard' : ActorMethod<[], undefined>,
  'findBiggestCardSum' : ActorMethod<[Array<bigint>], bigint>,
  'getCard' : ActorMethod<[], bigint>,
  'getCiphertext' : ActorMethod<[string], Array<string>>,
  'getCounterpartCards' : ActorMethod<[string], Array<bigint>>,
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
    ]
  >,
  'getPlayerCards' : ActorMethod<[string], Array<bigint>>,
  'handleCall' : ActorMethod<[], undefined>,
  'initializeCards' : ActorMethod<[], undefined>,
  'initializeGame' : ActorMethod<[], undefined>,
  'playerReady' : ActorMethod<[string, string, string], string>,
}
