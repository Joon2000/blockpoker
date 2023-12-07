export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'Call' : IDL.Func([IDL.Text], [], []),
    'Fold' : IDL.Func([IDL.Text], [], []),
    'Raise' : IDL.Func([IDL.Text], [], []),
    'TotalInitialization' : IDL.Func([], [], []),
    'addCard' : IDL.Func([], [], []),
    'findBiggestCardSum' : IDL.Func([IDL.Vec(IDL.Nat)], [IDL.Nat], []),
    'getCard' : IDL.Func([], [IDL.Nat], []),
    'getCiphertext' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'getCounterpartCards' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Nat)], ['query']),
    'getGameData' : IDL.Func(
        [IDL.Text],
        [
          IDL.Nat,
          IDL.Nat,
          IDL.Text,
          IDL.Bool,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
        ],
        [],
      ),
    'getPlayerCards' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Nat)], ['query']),
    'handleCall' : IDL.Func([], [], []),
    'initializeCards' : IDL.Func([], [], []),
    'initializeGame' : IDL.Func([], [], []),
    'playerReady' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
