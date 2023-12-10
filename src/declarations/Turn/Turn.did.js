export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'Call' : IDL.Func([IDL.Text], [], []),
    'Fold' : IDL.Func([IDL.Text], [], []),
    'Raise' : IDL.Func([IDL.Text], [], []),
    'TotalInitialization' : IDL.Func([], [], []),
    'findBiggestCardSum' : IDL.Func([IDL.Vec(IDL.Nat)], [IDL.Nat], []),
    'getCounterpartCards' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Nat)], ['query']),
    'getDecryptedCards' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat)], [], []),
    'getEncryptedCardDeck' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getEncryptedPlayerCards' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], []),
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
          IDL.Bool,
          IDL.Bool,
          IDL.Bool,
        ],
        [],
      ),
    'getPlayerInternetIdentityPrincipals' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Opt(IDL.Principal))],
        ['query'],
      ),
    'handleCall' : IDL.Func([], [], []),
    'initializeGame' : IDL.Func([], [], []),
    'playerReady' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'storeEncryptedCardDeck' : IDL.Func([IDL.Vec(IDL.Text)], [], []),
    'storeEncryptedPlayerCards' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Text)],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
