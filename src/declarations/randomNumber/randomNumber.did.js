export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getRandomNumber' : IDL.Func([], [IDL.Opt(IDL.Nat8)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
