export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
  const List_2 = IDL.Rec();
  const PlayStatus = IDL.Variant({
    'PLAYING' : IDL.Null,
    'GAME_END' : IDL.Null,
    'ALL_READY' : IDL.Null,
    'NOT_READY' : IDL.Null,
  });
  const GameStatus = IDL.Record({
    'totalBettingAmount' : IDL.Nat,
    'masterPlayer' : IDL.Opt(IDL.Principal),
    'playStatus' : PlayStatus,
    'whoseTurn' : IDL.Opt(IDL.Principal),
  });
  const Card = IDL.Record({ 'order' : IDL.Nat, 'cardNumber' : IDL.Nat });
  List_2.fill(IDL.Opt(IDL.Tuple(Card, List_2)));
  const Choice = IDL.Variant({
    'CALL' : IDL.Null,
    'FOLD' : IDL.Null,
    'NONE' : IDL.Null,
    'RAISE' : IDL.Null,
    'CHECK' : IDL.Null,
  });
  const Player = IDL.Record({
    'cards' : List_2,
    'totalBettingAmount' : IDL.Nat,
    'isReady' : IDL.Bool,
    'currentBettingAmount' : IDL.Nat,
    'address' : IDL.Principal,
    'bettingChoice' : Choice,
  });
  List_1.fill(IDL.Opt(IDL.Tuple(Player, List_1)));
  List.fill(IDL.Opt(IDL.Tuple(IDL.Principal, List)));
  return IDL.Service({
    'exitGame' : IDL.Func([IDL.Principal], [], ['oneway']),
    'getGameStatus' : IDL.Func([], [GameStatus], ['query']),
    'getPlayerInfo' : IDL.Func([IDL.Principal], [IDL.Opt(Player)], ['query']),
    'getPlayerInfoList' : IDL.Func([], [List_1], ['query']),
    'getPlayerList' : IDL.Func([], [List], ['query']),
    'readyGame' : IDL.Func([IDL.Principal], [], ['oneway']),
    'startGame' : IDL.Func([IDL.Principal], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
