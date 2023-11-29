import randomNumber "canister:randomNumber";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

actor {

    // type Player = {
    //     address : ?Principal;
    //     isReady : Bool;
    //     cards : List.List<Nat>;
    //     totalBettingAmount : Nat;
    //     currentBettingAmount: Nat;
    //     bettingChoice: Text;
    // };

    // type CardDeck = {
    //     cards : List.List<Nat>;
    //     currentNumberOfCards : Nat;
    // };

    // type GameStatus = {
    //     isBothPlayerReady : Bool;
    //     totalBettingAmount : Nat;
    // };

    // VARIABLES
     class Player(
        _address : ?Principal, 
        _isReady : Bool, 
        _cards : List.List<?Nat>, 
        _totalBettingAmount : Nat, 
        _currentBettingAmount: Nat, 
        _bettingChoice: Text
        ) {
        public var address = _address;
        public var isReady = _isReady;
        public var cards = _cards;
        public var totalBettingAmount = _totalBettingAmount;
        public var currentBettingAmount = _currentBettingAmount;
        public var bettingChoice = _bettingChoice;

    }; 

    let player1 = Player(null, false, List.nil<?Nat>(), 0, 0, "NONE");
    let player2 = Player(null, false, List.nil<?Nat>(), 0, 0, "NONE");



    // stable var player2 : Player = {
    //     address = null;
    //     isReady = false;
    //     cards = List.nil<Nat>();
    //     totalBettingAmount = 0;
    //     currentBettingAmount = 0;
    //     bettingChoice = "NONE";
    // };
    
    public func initializeCards(): async ?(){
        //immutable variables?
        do ? {
        player1.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player1.cards);
        player1.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player1.cards);
        player2.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player2.cards);
        player2.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player2.cards);
        };
    };

    public func playerReady(principal: Text): async (Text){
        var address = Principal.fromText(principal);
        if(player1.address==null){
            player1.address:=?address;
            return "PLAYER1";
        } else {
            player2.address:=?address;
            let result = await initializeCards();
            return "PLAYER2";
        };
    } ;

    public query func getPlayer1Cards(principal: Text): async ?(?Nat,?Nat){
        do?{
            var address = Principal.fromText(principal);
            if(?address==player1.address){
                return ?(List.get<?Nat>(player1.cards,0)!,List.get<?Nat>(player1.cards,1)!)
            } else {
                return ?(List.get<?Nat>(player2.cards,0)!,List.get<?Nat>(player1.cards,1)!)
            }
        }
    } 

}