import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Prelude "mo:base/Prelude";
import Hash "mo:base/Hash";
import randomNumber "canister:randomNumber";


actor {
    type Choice = { #FOLD; #CHECK; #RAISE; #CALL; #NONE;};
    type Player = {
        address : Principal;
        isReady : Bool;
        cards : List.List<Card>;
        totalBettingAmount : Nat;
        currentBettingAmount : Nat;
        bettingChoice : Choice;
    };

    type Card = {
        cardNumber : Nat;
        order : Nat;
    };

    type CardDeck = {
        cards : List.List<Card>;
        currentNumberOfCards : Nat;
        numberOfUsedCards : Nat;
    };

    type MutableCardDeck = {
        var cards : List.List<Card>;
        var currentNumberOfCards : Nat;
        var numberOfUsedCards : Nat;
    };

    type PlayStatus = { #NOT_READY; #ALL_READY; #PLAYING; #GAME_END };

    // query용 immutable type
    type GameStatus = {
        playStatus : PlayStatus;
        totalBettingAmount : Nat;
        whoseTurn : ?Principal;
        masterPlayer : ?Principal;
        cardDeck : CardDeck;
    };

    type MutableGameStatus = {
        var playStatus : PlayStatus;
        var totalBettingAmount : Nat;
        var whoseTurn : ?Principal;
        var masterPlayer : ?Principal;
        var cardDeck : MutableCardDeck;
    };

    // 게임 참여 최대 인원 수 4명
    let MAX_PLAYER = 4;
    let players = HashMap.HashMap<Principal, Player>(MAX_PLAYER, Principal.equal , Principal.hash);

    // let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 52;
    let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 10;

    var cardDeck : MutableCardDeck = {
        var cards = List.nil<Card>();
        var currentNumberOfCards = 0;
        var numberOfUsedCards = 0;
    };

    var usedCardDeck : MutableCardDeck = {
        var cards = List.nil<Card>();
        var currentNumberOfCards = 0;
        var numberOfUsedCards = 0;
    };

    var gameStatus : MutableGameStatus = {
        var playStatus = #NOT_READY;
        var totalBettingAmount = 0;
        var whoseTurn = null;
        var masterPlayer = null;
        var cardDeck = cardDeck;
    };

    // 필요한 query 함수들
    public query func getGameStatus() : async GameStatus {
        let immuCardDeck : CardDeck = {
            cards = cardDeck.cards;
            currentNumberOfCards = cardDeck.currentNumberOfCards;
            numberOfUsedCards = cardDeck.numberOfUsedCards;  
        };

        let _gameStatus : GameStatus = {
            playStatus = gameStatus.playStatus;
            totalBettingAmount = gameStatus.totalBettingAmount;
            whoseTurn = gameStatus.whoseTurn;
            masterPlayer = gameStatus.masterPlayer;
            cardDeck = immuCardDeck;
        };

        _gameStatus
    };


    public query func getPlayerList() : async List.List<Principal> {
        var playerList : List.List<Principal> = List.nil<Principal>();
        for (key in players.keys()) {
            playerList := List.push<Principal>(key, playerList);
        };

        playerList
    };

    public query func getPlayerInfo(player : Principal) : async ?Player {
        players.get(player)
    };

    public query func getPlayerInfoList() : async List.List<Player> {
        var playerInfoList : List.List<Player> = List.nil<Player>();
        for (val in players.vals()) {
            playerInfoList := List.push<Player>(val, playerInfoList);
        };
        
        playerInfoList
    };

    func readyForPlayer1() : async() {

    };

    func readyForPlayer2() : async() {

    };


    public query func getGameStatus() : async() {

    };
}