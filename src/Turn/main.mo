import random_number "canister:random_number";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Debug "mo:base/Debug";

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
        _cards : [var Nat], 
        _totalBettingAmount : Nat, 
        _currentBettingAmount: Nat, 
        _bettingChoice: Text,
        _totalChips: Nat
        ) {
        public var address = _address;
        public var internetIdentityPrincipal = _internetIdentityPrincipal;
        public var isReady = _isReady;
        public var cards = _cards;
        public var totalBettingAmount = _totalBettingAmount;
        public var currentBettingAmount = _currentBettingAmount;
        public var bettingChoice = _bettingChoice;
        public var totalChips = _totalChips;
    }; 

    class Dealer(
        _address : ?Principal,
        _internetIdentityPrincipal : ?Principal,
        _cardDeck : [var Nat],
        _cipherText: [var Text]
    ){
        public var address = _address;
        public var intenetIdentityPrincipal = _internetIdentityPrincipal;
        public var cardDeck = _cardDeck;
        public var cipherText = _cipherText;
    };
    // merge DONE
    class GameStatus(_isBothPlayerReady:Bool, _totalBettingAmount:Nat, _gameTurn:Text, _callState:Bool){
        public var isBothPlayerReady = _isBothPlayerReady;
        public var totalBettingAmount = _totalBettingAmount;
        public var gameTurn = _gameTurn;
        public var callState = _callState
    };

    // DONE
    let dealer = Dealer(
        null,
        null,
        Array.init<Nat>(52,0),
        Array.init<Text>(2,"")
    );
    let player1 = Player(null, null, false, Array.init<Nat>(3,0), 0, 0, "NONE", 100);
    let player2 = Player(null, null, false, Array.init<Nat>(3,0), 0, 0, "NONE", 100);
    let gameStatus = GameStatus(false, 0, "NEITHER", false);

    public func getCard(): async Nat{
        let card = await random_number.generateRandomNumber();
        return Option.get((card, 0))

    };
    
    // PROCESSING -> fillCardDeck
    public func initializeCards(): async (){
        //immutable variables?
        player1.cards[0] := await getCard();
        player1.cards[1] := await getCard();
        player2.cards[0] := await getCard();
        player2.cards[1] := await getCard();
    };

    public func addCard(): async (){
        //immutable variables?
        player1.cards[2] := await getCard();
        player2.cards[2] := await getCard();
    };

    // DONE
    public func playerReady(principal: Text, ibeCiphertext: Text, iIPrincipal: Text): async (Text){
        var address = Principal.fromText(principal);
        var internetIdentityPrincipal = Principal.fromText(iIPrincipal);
        if(dealer.address ==null){
            dealer.address:=?address;
            dealer.intenetIdentityPrincipal:=?internetIdentityPrincipal;
            return "DEALER";
        } else if(player1.address==null){
            player1.address:=?address;
            player1.internetIdentityPrincipal:=?internetIdentityPrincipal;
            dealer.cipherText[0]:=ibeCiphertext;
            return "PLAYER1";
        } else {
            player2.address:=?address;
            player2.internetIdentityPrincipal:=?internetIdentityPrincipal;
            dealer.cipherText[1]:=ibeCiphertext;
            let result = await initializeCards();
            gameStatus.isBothPlayerReady:=true;
            gameStatus.gameTurn:="PLAYER1";
            return "PLAYER2";
        };
    } ;

    //Retun 값이 JSON 형태면 좋겠음
    // DONE
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

    public query func getCiphertext(principal: Text): async [Text]{
        var address = Principal.fromText(principal);
        if(?address == dealer.address){
            return [dealer.cipherText[0],dealer.cipherText[1]]
        };
        return ["",""]
    };

    // getPlayerList에서 얻을 수 있음
    // DONE
    public query func getPlayerCards(principal: Text): async [Nat]{
        var address = Principal.fromText(principal);
        if(?address==player1.address){
            return [player1.cards[0],player1.cards[1],player1.cards[2]];
        } else {
            return [player2.cards[0],player2.cards[1],player2.cards[2]];
        }
    };

    // getPlayersInfoList에서 얻을 수 있음
    // DONE
    public query func getCounterpartCards(principal: Text): async [Nat]{
        var address = Principal.fromText(principal);
        if(?address==player2.address){
            return [player1.cards[0],player1.cards[1],player1.cards[2]];
        } else {
            return [player2.cards[0],player2.cards[1],player2.cards[2]];
        }
    };


    // endGame에 필요함
    public func initializeGame(): async (){
        gameStatus.totalBettingAmount:=0;
        player1.totalBettingAmount:=0;
        player1.currentBettingAmount:=0;
        player2.totalBettingAmount:=0;
        player2.currentBettingAmount:=0;
        player1.bettingChoice:="NONE";
        player2.bettingChoice:="NONE";
        player1.cards:=Array.init<Nat>(3,0);
        player2.cards:=Array.init<Nat>(3,0);
        let result = await initializeCards();
        gameStatus.gameTurn:="PLAYER1";
    };

    // 필요함
    public func Fold(principal: Text): async (){
        var address = Principal.fromText(principal);
        if (?address==player1.address){
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
            let result = await addCard();
        } else{
            var player1BiggestCardSum=await findBiggestCardSum([
                player1.cards[0],
                player1.cards[1],
                player1.cards[2]
            ]);
            var player2BiggestCardSum=await findBiggestCardSum([
                player2.cards[0],
                player2.cards[1],
                player2.cards[2]
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

    public func Call(principal: Text): async (){
        var address = Principal.fromText(principal);
        if(?address==player1.address){
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

    public func Raise(principal: Text): async (){
        var address = Principal.fromText(principal);
        if(?address==player1.address){
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
        player1.cards:=Array.init<Nat>(3,0);
        player1.totalBettingAmount:=0;
        player1.currentBettingAmount:=0;
        player1.bettingChoice:="NONE";
        player1.totalChips:=100;
        player2.address:=null;
        player2.isReady:=false;
        player2.cards:=Array.init<Nat>(3,0);
        player2.totalBettingAmount:=0;
        player2.currentBettingAmount:=0;
        player2.bettingChoice:="NONE";
        player2.totalChips:=100;

        gameStatus.isBothPlayerReady:=false;
        gameStatus.totalBettingAmount:=0;
        gameStatus.gameTurn:="NEITHER";
        gameStatus.callState:=false;
    };
};
