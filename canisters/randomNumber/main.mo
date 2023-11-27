import Random "mo:base/Random";
import Blob "mo:base/Blob";

actor  {
    public func generateRandomNumber():async ?Nat {
        let entropy = await Random.blob(); // get initial entropy
        var f = Random.Finite(entropy);
        do ? {
            var result =f.range(5)!;
            return ?result;
        };
    };

};
