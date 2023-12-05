import List "mo:base/List";
import Stack "mo:base/Stack";

module Types {
    public type PlayingStatus = { #NOT_ALL_READY; #ALL_READY; #PLAYING; #GAME_END };
    public type BettingAction = { #FOLD; #CHECK; #RAISE; #CALL; #NONE;};
    public type Player = {
        address : Principal;
        isReady : Bool;
        cards : List.List<Card>;
        // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
        totalCardNumber : Nat;
        currentChips : Nat;
        totalBettingChips : Nat;
        currentBettingChips : Nat;
        bettingAction : BettingAction;
    };

     public type MutablePlayer = {
        var address : Principal;
        var isReady : Bool;
        var cards : List.List<Card>;
        // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
        var totalCardNumber : Nat;
        var currentChips : Nat;
        var totalBettingChips : Nat;
        var currentBettingChips : Nat;
        var bettingAction : BettingAction;
    };

    public type Card = {
        cardNumber : Nat;
        order : Nat;
    };

    public type CardDeck = List.List<Card>;

    
    public type MoneyBox = Nat;

    public type GameStatus = {
        playingStatus : PlayingStatus;
        masterPlayer : ?Principal;
        whoseTurn : ?Principal;
        cardDeck : CardDeck;
        moneyBox : MoneyBox;
        isAllCall : Bool;
    };

    public type MutableGameStatus = {
        var playingStatus : PlayingStatus;
        var masterPlayer : ?Principal;
        var whoseTurn : ?Principal;
        var cardDeck : CardDeck;
        var moneyBox : MoneyBox;
        var isAllCall : Bool;
    };
};