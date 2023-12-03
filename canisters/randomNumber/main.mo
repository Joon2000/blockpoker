import Random "mo:base/Random";
import Blob "mo:base/Blob";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";


actor  {
    public func generateRandomNumber():async ?Nat {
        let entropy = await Random.blob(); // get initial entropy
        var f = Random.Finite(entropy);
        do ? {
            var result =f.range(8)!%10;
            return ?result;
        };
    };

    public func generateCardDeck() : async [Nat] {
        var isEmpty = Array.init<Bool>(10,true);
        var number = 0;
        var cardDeck = List.nil<Nat>(); // => null
        for (n in Iter.range(0, 10)){
            number := await getNumber();
            // while(isEmpty[number]==false){
            //     Debug.print (Nat.toText number);
            //     number:=(number+1)%10
            // };
            Debug.print "Final number";
            Debug.print (Nat.toText number);

            isEmpty[number]:=false;
            cardDeck:=List.push(number+1,cardDeck);
        };
        return List.toArray(cardDeck);
    };

    public func getNumber(): async Nat{
        let number = await generateRandomNumber();
        return Option.get((number, 0))

    };
};
