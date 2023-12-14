// import random_number "canister:random_number";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {
    //DONE
    type Choice = { #FOLD; #CHECK; #RAISE; #CALL; #NONE };
    // whoseTurn 으로 대체함
    // DONE
    type Turn = { #PLAYER1; #PLAYER2; #NEITHER; };

    // VARIABLES
    // DONE
     class Player(
        _address : ?Principal, 
        _internetIdentityPrincipal: ?Principal,
        _isReady : Bool, 
        _encryptedCards : [var Text], 
        _decryptedCards : [var Nat],
        _totalBettingAmount : Nat, 
        _currentBettingAmount: Nat, 
        _bettingChoice: Text,
        _totalChips: Nat
        ) {
        public var address = _address;
        public var internetIdentityPrincipal = _internetIdentityPrincipal;
        public var isReady = _isReady;
        public var encryptedCards = _encryptedCards;
        public var decryptedCards = _decryptedCards;
        public var totalBettingAmount = _totalBettingAmount;
        public var currentBettingAmount = _currentBettingAmount;
        public var bettingChoice = _bettingChoice;
        public var totalChips = _totalChips;
    }; 

    class Dealer(
        _address : ?Principal,
        _internetIdentityPrincipal : ?Principal,
        _encryptedCardDeck : [var Text],
    ){
        public var address = _address;
        public var intenetIdentityPrincipal = _internetIdentityPrincipal;
        public var encryptedCardDeck = _encryptedCardDeck;
    };
    // merge DONE
    class GameStatus(_isBothPlayerReady:Bool, _totalBettingAmount:Nat, _gameTurn:Text, _callState:Bool, _isEnd:Bool, _initializeSwitch: Bool){
        public var isBothPlayerReady = _isBothPlayerReady;
        public var totalBettingAmount = _totalBettingAmount;
        public var gameTurn = _gameTurn;
        public var callState = _callState;
        public var isEnd = _isEnd;
        public var initializeSwitch = _initializeSwitch;
    };

    // DONE
    let dealer = Dealer(null, null, Array.init<Text>(52,""));
    let player1 = Player(null, null, false, Array.init<Text>(3,""), Array.init<Nat>(3,0), 0, 0, "NONE", 100);
    let player2 = Player(null, null, false, Array.init<Text>(3,""), Array.init<Nat>(3,0), 0, 0, "NONE", 100);
    let gameStatus = GameStatus(false, 0, "NEITHER", false, false, false);
    

    // DONE
    public func playerReady(principalText: Text, iIPrincipalText: Text): async (Text){
        let principal = Principal.fromText(principalText);
        let iIPrincipal = Principal.fromText(iIPrincipalText);
        if(dealer.address ==null){
            dealer.address:=?principal;
            dealer.intenetIdentityPrincipal:=?iIPrincipal;
            return "DEALER";
        } else if(player1.address==null){
            player1.address:=?principal;
            player1.internetIdentityPrincipal:=?iIPrincipal;
            return "PLAYER1";
        } else {
            player2.address:=?principal;
            player2.internetIdentityPrincipal:=?iIPrincipal;
            gameStatus.isBothPlayerReady:=true;
            gameStatus.gameTurn:="PLAYER1";
            return "PLAYER2";
        };
    } ;

    //Retun 값이 JSON 형태면 좋겠음
    // DONE
    public func getGameData(principalText: Text): async (Nat, Nat, Text, Bool, Nat, Nat, Nat, Text, Text, Nat, Nat, Bool, Bool, Bool){
        let principal = Principal.fromText(principalText);
        if(?principal==player1.address){
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
                player2.totalChips,
                gameStatus.callState,
                gameStatus.isEnd,
                gameStatus.initializeSwitch
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
                player1.totalChips,
                gameStatus.callState,
                gameStatus.isEnd,
                gameStatus.initializeSwitch
            )
        }

    };


    // // getPlayersInfoList에서 얻을 수 있음
    // // DONE
    // public query func getCounterpartCards(principal: Text): async [Nat]{
    //     var address = Principal.fromText(principal);
    //     if(?address==player2.address){
    //         return [player1.cards[0],player1.cards[1],player1.cards[2]];
    //     } else {
    //         return [player2.cards[0],player2.cards[1],player2.cards[2]];
    //     }
    // };


    // endGame에 필요함
    public func initializeGame(): async (){
        gameStatus.totalBettingAmount:=0;
        player1.totalBettingAmount:=0;
        player1.currentBettingAmount:=0;
        player2.totalBettingAmount:=0;
        player2.currentBettingAmount:=0;
        player1.bettingChoice:="NONE";
        player2.bettingChoice:="NONE";
        player1.encryptedCards:=Array.init<Text>(3,"");
        player2.encryptedCards:=Array.init<Text>(3,"");
        gameStatus.initializeSwitch := not gameStatus.initializeSwitch;
        gameStatus.gameTurn:="PLAYER1";
    };

    // 필요함
    public func Fold(principalText: Text): async (){
        let principal = Principal.fromText(principalText);
        if (?principal==player1.address){
            player2.totalChips+=gameStatus.totalBettingAmount;
        } else {
            player1.totalChips+=gameStatus.totalBettingAmount;
        };
        gameStatus.gameTurn:="END";
    };

    public func findBiggestCardSum(cards: [Nat]): async (Nat){
        var smallestCard = cards[0];
        var sumOfCards=0;
        for (card in cards.vals()){
            if(smallestCard>=card){
                smallestCard:=card;
            };
            sumOfCards+=card;
        };
        return sumOfCards - smallestCard;
    };

    public func handleCall(): async (){
        if(gameStatus.callState==false){
            gameStatus.callState:=true;
            player1.bettingChoice:="NONE";
            player2.bettingChoice:="NONE";
            player1.currentBettingAmount:=0;
            player2.currentBettingAmount:=0;
            // let result = await addCard();
        } else{
             
            var player1BiggestCardSum=await findBiggestCardSum([
                player1.decryptedCards[0],
                player1.decryptedCards[1],
                player1.decryptedCards[2]
            ]);
            var player2BiggestCardSum=await findBiggestCardSum([
                player2.decryptedCards[0],
                player2.decryptedCards[1],
                player2.decryptedCards[2]
            ]);
            if (player1BiggestCardSum==player2BiggestCardSum){
                player1.totalChips+=(gameStatus.totalBettingAmount+gameStatus.totalBettingAmount%2)/2;
                player2.totalChips+=(gameStatus.totalBettingAmount-gameStatus.totalBettingAmount%2)/2;
            } else if (player1BiggestCardSum>=player2BiggestCardSum){
                player1.totalChips+=gameStatus.totalBettingAmount;
            } else {
                player2.totalChips+=gameStatus.totalBettingAmount;
            };
            gameStatus.totalBettingAmount:=0;
            player1.totalBettingAmount:=0;
            player1.currentBettingAmount:=0;
            player2.totalBettingAmount:=0;
            player2.currentBettingAmount:=0;
            gameStatus.gameTurn:="END";
        };
    };

    public func Call(principalText: Text): async (){
        let principal = Principal.fromText(principalText);
        if(?principal==player1.address){
            player1.currentBettingAmount:=player2.totalBettingAmount-player1.totalBettingAmount;
            if(player1.currentBettingAmount==0){
                player1.currentBettingAmount+=1;
            };
            player1.totalBettingAmount+=player1.currentBettingAmount;
            player1.totalChips-=player1.currentBettingAmount;
            gameStatus.totalBettingAmount+=player1.currentBettingAmount;
            player1.bettingChoice:="CALL";
            if(player2.bettingChoice=="CALL"){
                let result = handleCall();
            };
            gameStatus.gameTurn:="PLAYER2"
        } else {
            player2.currentBettingAmount:=player1.totalBettingAmount-player2.totalBettingAmount;
            if(player2.currentBettingAmount==0){
                player2.currentBettingAmount+=1;
            };
            player2.totalBettingAmount+=player2.currentBettingAmount;
            player2.totalChips-=player2.currentBettingAmount;
            gameStatus.totalBettingAmount+=player2.currentBettingAmount;
            player2.bettingChoice:="CALL";
            if(player1.bettingChoice=="CALL"){
                let result = handleCall();
            };
            gameStatus.gameTurn:="PLAYER1"
        }
    }; 

    public func Raise(principalText: Text): async (){
        let principal = Principal.fromText(principalText);
        if(?principal==player1.address){
            player1.currentBettingAmount:=player2.totalBettingAmount-player1.totalBettingAmount;
            player1.currentBettingAmount+=2;
            player1.totalBettingAmount+=player1.currentBettingAmount;
            player1.totalChips-=player1.currentBettingAmount;
            gameStatus.totalBettingAmount+=player1.currentBettingAmount;
            player1.bettingChoice:="RAISE";
            gameStatus.gameTurn:="PLAYER2";
        } else {
            player2.currentBettingAmount:=player1.totalBettingAmount-player2.totalBettingAmount;
            player2.currentBettingAmount+=2;
            player2.totalBettingAmount+=player2.currentBettingAmount;
            player2.totalChips-=player2.currentBettingAmount;
            gameStatus.totalBettingAmount+=player2.currentBettingAmount;
            player2.bettingChoice:="RAISE";
            gameStatus.gameTurn:="PLAYER1";
        }
    };

    public func TotalInitialization(): async (){
        player1.address:=null;
        player1.isReady:=false;
        player1.encryptedCards:=Array.init<Text>(3,"");
        player1.totalBettingAmount:=0;
        player1.currentBettingAmount:=0;
        player1.bettingChoice:="NONE";
        player1.totalChips:=100;
        player2.address:=null;
        player2.isReady:=false;
        player2.encryptedCards:=Array.init<Text>(3,"");
        player2.totalBettingAmount:=0;
        player2.currentBettingAmount:=0;
        player2.bettingChoice:="NONE";
        player2.totalChips:=100;

        gameStatus.isBothPlayerReady:=false;
        gameStatus.totalBettingAmount:=0;
        gameStatus.gameTurn:="NEITHER";
        gameStatus.callState:=false;
    };

    public func storeEncryptedPlayerCards(iIPrincipalText: Text, encryptedCards: [Text]): async (){
        let iIPrincipal = Principal.fromText(iIPrincipalText);
        if(gameStatus.callState==false) {        
            if(?iIPrincipal==player1.internetIdentityPrincipal){
                player1.encryptedCards[0]:=encryptedCards[0];
                player1.encryptedCards[1]:=encryptedCards[1]
            } else {
                player2.encryptedCards[0]:=encryptedCards[0];
                player2.encryptedCards[1]:=encryptedCards[1]
            }
        } else {
            if(?iIPrincipal==player1.internetIdentityPrincipal){
                player1.encryptedCards[2]:=encryptedCards[0];
            } else {
                player2.encryptedCards[2]:=encryptedCards[0];
            }
        };
    };

    public func getEncryptedPlayerCards(iIPrincipalText: Text): async [Text]{
        let iIPrincipal = Principal.fromText(iIPrincipalText);
        if(?iIPrincipal==player1.internetIdentityPrincipal){
            return [player1.encryptedCards[0], player1.encryptedCards[1], player1.encryptedCards[2]]
        } else {
            return [player2.encryptedCards[0], player2.encryptedCards[1], player2.encryptedCards[2]]
        }
    };

    public query func getPlayerInternetIdentityPrincipals(principalText: Text): async [?Principal] {
        let principal = Principal.fromText(principalText);
        if (?principal==dealer.address){
            return [player1.internetIdentityPrincipal, player2.internetIdentityPrincipal]
        };
        return [null, null]
    };

    public func storeEncryptedCardDeck(encryptedCardDeck: [Text]): async () {
        for (i in Iter.range(0, 51)){
            dealer.encryptedCardDeck[i]:=encryptedCardDeck[i];
        }
    };

    public query func getEncryptedCardDeck(): async [Text] {
        return List.toArray(List.fromVarArray(dealer.encryptedCardDeck));
    };

    public func getDecryptedCards(principalText: Text, cards: [Nat]): async() {
        let principal = Principal.fromText(principalText);
        if(?principal==player1.address){
            for(i in Iter.range(0,2)){
                player1.decryptedCards[i] := cards[i]
            }
        } else {
            for(i in Iter.range(0,2)){
                player2.decryptedCards[i] := cards[i]
            }
        }
    };

    public query func getCounterpartCards(principalText: Text): async [Nat]{
        let principal = Principal.fromText(principalText);
        if(?principal==player2.address){
            return [player1.decryptedCards[0],player1.decryptedCards[1],player1.decryptedCards[2]];
        } else {
            return [player2.decryptedCards[0],player2.decryptedCards[1],player2.decryptedCards[2]];
        }
    };
};
