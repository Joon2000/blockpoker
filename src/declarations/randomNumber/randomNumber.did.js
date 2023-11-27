export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'generateRandomNumber' : IDL.Func([], [IDL.Opt(IDL.Nat)], []),
  });
};
export const init = ({ IDL }) => { return []; };
