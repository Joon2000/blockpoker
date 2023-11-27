import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";

actor {
    // bettingChoice : 1 = call, 2 = raise, 3 = fold
    type Player = {
        address : Principal;
        isReady : Bool;
        cards : List.List<Card>;
        totalBettingAmount : Nat;
        currentBettingAmount : Nat;
        bettingChoice : Nat;
    };

    type Card = {
        cardNumber : Nat;
        order : Nat;
    };
}