import Random "mo:base/Random";
import Blob "mo:base/Blob";


actor  {

    private func generateRandomNumber(): ?Nat8 {
        
        // let random = Random.Finite(await Random.blob());
        let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
        let random = Random.Finite(seed);
        random.binomial(10)
    };

    public query func getRandomNumber(): async ?Nat8 {
        let number = generateRandomNumber();
    };
};
