export const idlFactory = ({ IDL }) => {
  return IDL.Service({
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
        ],
        [],
      ),
    'getPlayer1Cards' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Tuple(IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat))
          ),
        ],
        ['query'],
      ),
    'initializeCards' : IDL.Func([], [IDL.Opt(IDL.Null)], []),
    'playerReady' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
