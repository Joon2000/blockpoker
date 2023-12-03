export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'generateCardDeck' : IDL.Func([], [IDL.Vec(IDL.Nat)], []),
    'generateRandomNumber' : IDL.Func([], [IDL.Opt(IDL.Nat)], []),
    'getNumber' : IDL.Func([], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
