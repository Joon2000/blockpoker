import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Card { 'order' : bigint, 'cardNumber' : bigint }
export type Choice = { 'CALL' : null } |
  { 'FOLD' : null } |
  { 'NONE' : null } |
  { 'RAISE' : null } |
  { 'CHECK' : null };
export interface GameStatus {
  'totalBettingAmount' : bigint,
  'masterPlayer' : [] | [Principal],
  'playStatus' : PlayStatus,
  'whoseTurn' : [] | [Principal],
}
export type List = [] | [[Principal, List]];
export type List_1 = [] | [[Player, List_1]];
export type List_2 = [] | [[Card, List_2]];
export type PlayStatus = { 'PLAYING' : null } |
  { 'GAME_END' : null } |
  { 'ALL_READY' : null } |
  { 'NOT_READY' : null };
export interface Player {
  'cards' : List_2,
  'totalBettingAmount' : bigint,
  'isReady' : boolean,
  'currentBettingAmount' : bigint,
  'address' : Principal,
  'bettingChoice' : Choice,
}
export interface _SERVICE {
  'exitGame' : ActorMethod<[Principal], undefined>,
  'getGameStatus' : ActorMethod<[], GameStatus>,
  'getPlayerInfo' : ActorMethod<[Principal], [] | [Player]>,
  'getPlayerInfoList' : ActorMethod<[], List_1>,
  'getPlayerList' : ActorMethod<[], List>,
  'readyGame' : ActorMethod<[Principal], undefined>,
  'startGame' : ActorMethod<[Principal], undefined>,
}
