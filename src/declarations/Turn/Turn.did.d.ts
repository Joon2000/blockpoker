import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getPlayer1Cards' : ActorMethod<
    [string],
    [] | [[[] | [bigint], [] | [bigint]]]
  >,
  'initializeCards' : ActorMethod<[], [] | [null]>,
  'playerReady' : ActorMethod<[string], string>,
}
