import randomNumber "canister:randomNumber";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

actor {
    type Choice = { #FOLD; #CHECK; #RAISE; #CALL; #NONE };
    type Turn = { #PLAYER1; #PLAYER2; #NEITHER; };


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
        _bettingChoice: Text,
        _totalChips: Nat
        ) {
        public var address = _address;
        public var isReady = _isReady;
        public var cards = _cards;
        public var totalBettingAmount = _totalBettingAmount;
        public var currentBettingAmount = _currentBettingAmount;
        public var bettingChoice = _bettingChoice;
        public var totalChips = _totalChips;
    }; 

    class GameStatus(_isBothPlayerReady:Bool, _totalBettingAmount:Nat, _gameTurn:Text, _callState:Bool){
        public var isBothPlayerReady = _isBothPlayerReady;
        public var totalBettingAmount = _totalBettingAmount;
        public var gameTurn = _gameTurn;
        public var callState = _callState
    };

    let player1 = Player(null, false, List.nil<?Nat>(), 0, 0, "NONE", 100);
    let player2 = Player(null, false, List.nil<?Nat>(), 0, 0, "NONE", 100);
    let gameStatus = GameStatus(false, 0, "NEITHER", false);



    // stable var player2 : Player = {
    //     address = null;
    //     isReady = false;
    //     cards = List.nil<Nat>();
    //     totalBettingAmount = 0;
    //     currentBettingAmount = 0;
    //     bettingChoice = "NONE";
    // };

    public func getCard(): async (Nat){
        var card = null;
        do ?{
            while (card!=null)
            {var card = await randomNumber.generateRandomNumber();}
        }
    };
    
    public func initializeCards(): async ?(){
        //immutable variables?
        do ? {
        player1.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player1.cards);
        player1.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player1.cards);
        player2.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player2.cards);
        player2.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player2.cards);
        };
    };

    public func addCard(): async ?(){
        //immutable variables?
        do ? {
        player1.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player1.cards);
        player2.cards := List.push<?Nat>(await randomNumber.generateRandomNumber(), player2.cards);
        };
    };

    public func playerReady(principal: Text): async (Text){
        var address = Principal.fromText(principal);
        if(player1.address==null){
            player1.address:=?address;
            player1.cards := List.push<?Nat>(null, player1.cards);
            return "PLAYER1";
        } else {
            player2.address:=?address;
            player2.cards := List.push<?Nat>(null, player2.cards);
            let result = await initializeCards();
            gameStatus.isBothPlayerReady:=true;
            gameStatus.gameTurn:="PLAYER1";
            return "PLAYER2";
        };
    } ;

    //Retun 값이 JSON 형태면 좋겠음
    public func getGameData(principal: Text): async (Nat, Nat, Text, Bool, Nat, Nat, Nat, Text, Text, Nat, Nat){
        var address = Principal.fromText(principal);
        if(?address==player1.address){
            return (
                player1.totalBettingAmount, 
                player1.currentBettingAmount, 
                player1.bettingChoice,
                gameStatus.isBothPlayerReady, 
                gameStatus.totalBettingAmount, 
                player2.totalBettingAmount, 
                player2.currentBettingAmount, 
                player2.bettingChoice, 
                gameStatus.gameTurn,
                player1.totalChips,
                player2.totalChips
            )
        } else {
            return (
                player2.totalBettingAmount, 
                player2.currentBettingAmount, 
                player2.bettingChoice, 
                gameStatus.isBothPlayerReady, 
                gameStatus.totalBettingAmount, 
                player1.totalBettingAmount, 
                player1.currentBettingAmount, 
                player1.bettingChoice, 
                gameStatus.gameTurn,
                player2.totalChips,
                player1.totalChips
            )
        }

    };

    public query func getPlayerCards(principal: Text): async ?(?Nat,?Nat,?Nat){
        do?{
            var address = Principal.fromText(principal);
            if(?address==player1.address){
                return ?(List.get<?Nat>(player1.cards,0)!,List.get<?Nat>(player1.cards,1)!,List.get<?Nat>(player1.cards,2)!)
            } else {
                return ?(List.get<?Nat>(player2.cards,0)!,List.get<?Nat>(player1.cards,1)!,List.get<?Nat>(player2.cards,2)!)
            }
        }
    };

    public func Fold(principal: Text): async (){
        var address = Principal.fromText(principal);
        if (?address==player1.address){
            player1.totalChips+=gameStatus.totalBettingAmount;
        } else {
            player2.totalChips+=gameStatus.totalBettingAmount;
        };
        gameStatus.totalBettingAmount:=0;
        player1.totalBettingAmount:=0;
        player1.currentBettingAmount:=0;
        player2.totalBettingAmount:=0;
        player2.currentBettingAmount:=0;
        player1.bettingChoice:="NONE";
        player2.bettingChoice:="NONE";
        player1.cards:=List.nil<?Nat>();
        player2.cards:=List.nil<?Nat>();
        gameStatus.gameTurn:="NEITHER"
    };

    public func handleCall(): async (){
        if(gameStatus.callState==false){
            gameStatus.callState:=true;
            player1.bettingChoice:="NONE";
            player2.bettingChoice:="NONE";
            player1.currentBettingAmount:=0;
            player2.currentBettingAmount:=0;
            let result = await addCard();
        } else{
            do?{
                let player1
                var player1CardSum=List.get<?Nat>(player1.cards,0)!+List.get<?Nat>(player1.cards,1)!+List.get<?Nat>(player1.cards,2)!;
                var player2CardSum=List.get<?Nat>(player2.cards,0)!+List.get<?Nat>(player1.cards,1)!+List.get<?Nat>(player2.cards,2)!;
            }
        };
    };

    public func Call(principal: Text): async (){
       var address = Principal.fromText(principal);
       if(?address==player1.address){
        player1.currentBettingAmount+=player2.totalBettingAmount-player1.totalBettingAmount;
        if(player1.currentBettingAmount==0){
            player1.currentBettingAmount+=1;
        };
        player1.totalBettingAmount+=player1.currentBettingAmount;
        gameStatus.totalBettingAmount+=player1.currentBettingAmount;
        if(player2.bettingChoice=="CALL"){
            let result = handleCall();
        };
        player1.bettingChoice:="CALL";
        gameStatus.gameTurn:="PLAYER2"
       } else {
        player2.currentBettingAmount+=player1.totalBettingAmount-player2.totalBettingAmount;
        if(player2.currentBettingAmount==0){
            player2.currentBettingAmount+=1;
        };
        player2.totalBettingAmount+=player2.currentBettingAmount;
        gameStatus.totalBettingAmount+=player2.currentBettingAmount;
        if(player1.bettingChoice=="CALL"){
            let result = handleCall();
        };
        player2.bettingChoice:="CALL";
        gameStatus.gameTurn:="PLAYER1"
       }
    }; 
}