import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";

actor {
    //TYPES
    // bettingChoice : 1 = call, 2 = raise, 3 = fold
    type Player = {
        address : ?Principal;
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

    type CardDeck = {
        cards : List.List<Card>;
        currentNumberOfCards : Nat;
        

    };

    type GameStatus = {
        isBothPlayerReady : Bool;
        totalBettingAmount : Nat;
    };

    // VARIABLES
    stable var player1 : Player = {
        address = null;
        isReady = false;
        cards = List.nil<Card>();
        totalBettingAmount = 0;
        currentBettingAmount = 0;
        bettingChoice = 0;
    };

    stable var player2 : Player = {
        address = null;
        isReady = false;
        cards = List.nil<Card>();
        totalBettingAmount = 0;
        currentBettingAmount = 0;
        bettingChoice = 0;
    };

    // FUNCTIONS
    public func readyGame() : async() {
        if (player1.address == null and player2.address == null) {
            await readyForPlayer1();
        } else if (player1.address != null and player2.address == null) {
            await readyForPlayer2();
        } else {
            //
        };
    };

    func readyForPlayer1() : async() {

    };

    func readyForPlayer2() : async() {

    };


    public query func getGameStatus() : async() {

    };
}