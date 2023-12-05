export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
  const List_2 = IDL.Rec();
  const List_3 = IDL.Rec();
  const PlayingStatus = IDL.Variant({
    'PLAYING' : IDL.Null,
    'GAME_END' : IDL.Null,
    'ALL_READY' : IDL.Null,
    'NOT_ALL_READY' : IDL.Null,
  });
  const Card__1 = IDL.Record({ 'order' : IDL.Nat, 'cardNumber' : IDL.Nat });
  List_3.fill(IDL.Opt(IDL.Tuple(Card__1, List_3)));
  const CardDeck = IDL.Opt(IDL.Tuple(Card__1, List_3));
  const MoneyBox = IDL.Nat;
  const GameStatus = IDL.Record({
    'playingStatus' : PlayingStatus,
    'cardDeck' : CardDeck,
    'masterPlayer' : IDL.Opt(IDL.Principal),
    'isAllCall' : IDL.Bool,
    'whoseTurn' : IDL.Opt(IDL.Principal),
    'moneyBox' : MoneyBox,
  });
  const BettingAction = IDL.Variant({
    'CALL' : IDL.Null,
    'FOLD' : IDL.Null,
    'NONE' : IDL.Null,
    'RAISE' : IDL.Null,
    'CHECK' : IDL.Null,
  });
  const Player = IDL.Record({
    'cards' : List_3,
    'totalBettingChips' : IDL.Nat,
    'currentBettingChips' : IDL.Nat,
    'bettingAction' : BettingAction,
    'isReady' : IDL.Bool,
    'currentChips' : IDL.Nat,
    'totalCardNumber' : IDL.Nat,
    'address' : IDL.Principal,
  });
  List_2.fill(IDL.Opt(IDL.Tuple(Player, List_2)));
  List_1.fill(IDL.Opt(IDL.Tuple(IDL.Principal, List_1)));
  const Card = IDL.Record({ 'order' : IDL.Nat, 'cardNumber' : IDL.Nat });
  List.fill(IDL.Opt(IDL.Tuple(Card, List)));
  return IDL.Service({
    'endGame' : IDL.Func([], [], ['oneway']),
    'exchangePokerChips' : IDL.Func([IDL.Principal, IDL.Nat], [], ['oneway']),
    'exitGame' : IDL.Func([IDL.Principal], [], ['oneway']),
    'getGameStatus' : IDL.Func([], [GameStatus], ['query']),
    'getPlayerInfoList' : IDL.Func([], [List_2], ['query']),
    'getPlayerList' : IDL.Func([], [List_1], ['query']),
    'readyGame' : IDL.Func([IDL.Principal], [], ['oneway']),
    'startGame' : IDL.Func([IDL.Principal], [], ['oneway']),
    'test_drawCard' : IDL.Func([], [IDL.Opt(Card)], []),
    'test_getEncryptedCard' : IDL.Func([IDL.Nat, IDL.Nat], [List], []),
  });
};
export const init = ({ IDL }) => { return []; };
