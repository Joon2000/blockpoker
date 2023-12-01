import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'Fold' : ActorMethod<[string], undefined>,
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
  'getPlayerCards' : ActorMethod<
    [string],
    [] | [[[] | [bigint], [] | [bigint], [] | [bigint]]]
  >,
  'initializeCards' : ActorMethod<[], [] | [null]>,
  'playerReady' : ActorMethod<[string], string>,
}
