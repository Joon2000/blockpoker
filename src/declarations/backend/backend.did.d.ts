import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BettingAction = { 'CALL' : null } |
  { 'FOLD' : null } |
  { 'NONE' : null } |
  { 'RAISE' : null } |
  { 'CHECK' : null };
export interface Card { 'order' : bigint, 'cardNumber' : bigint }
export type CardDeck = [] | [[Card__1, List_3]];
export interface Card__1 { 'order' : bigint, 'cardNumber' : bigint }
export interface GameStatus {
  'playingStatus' : PlayingStatus,
  'cardDeck' : CardDeck,
  'masterPlayer' : [] | [Principal],
  'isAllCall' : boolean,
  'whoseTurn' : [] | [Principal],
  'moneyBox' : MoneyBox,
}
export type List = [] | [[Card, List]];
export type List_1 = [] | [[Principal, List_1]];
export type List_2 = [] | [[Player, List_2]];
export type List_3 = [] | [[Card__1, List_3]];
export type MoneyBox = bigint;
export interface Player {
  'cards' : List_3,
  'totalBettingChips' : bigint,
  'currentBettingChips' : bigint,
  'bettingAction' : BettingAction,
  'isReady' : boolean,
  'currentChips' : bigint,
  'totalCardNumber' : bigint,
  'address' : Principal,
}
export type PlayingStatus = { 'PLAYING' : null } |
  { 'GAME_END' : null } |
  { 'ALL_READY' : null } |
  { 'NOT_ALL_READY' : null };
export interface _SERVICE {
  'endGame' : ActorMethod<[], undefined>,
  'exchangePokerChips' : ActorMethod<[Principal, bigint], undefined>,
  'exitGame' : ActorMethod<[Principal], undefined>,
  'getGameStatus' : ActorMethod<[], GameStatus>,
  'getPlayerInfoList' : ActorMethod<[], List_2>,
  'getPlayerList' : ActorMethod<[], List_1>,
  'readyGame' : ActorMethod<[Principal], undefined>,
  'startGame' : ActorMethod<[Principal], undefined>,
  'test_drawCard' : ActorMethod<[], [] | [Card]>,
  'test_getEncryptedCard' : ActorMethod<[bigint, bigint], List>,
}
