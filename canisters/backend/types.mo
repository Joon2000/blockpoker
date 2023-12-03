import List "mo:base/List";

module Types {

    public type Choice = { #FOLD; #CHECK; #RAISE; #CALL; #NONE;};
    public type Player = {
        address : Principal;
        isReady : Bool;
        cards : List.List<Card>;
        // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
        totalCardNumber : Nat;
        totalBettingAmount : Nat;
        currentBettingAmount : Nat;
        bettingChoice : Choice;
    };

    public type Card = {
        cardNumber : Nat;
        order : Nat;
    };

    public type CardDeck = {
        cards : List.List<Card>;
        currentNumberOfCards : Nat;
        numberOfUsedCards : Nat;
    };

    public type MutableCardDeck = {
        var cards : List.List<Card>;
        var currentNumberOfCards : Nat;
        var numberOfUsedCards : Nat;
    };

    public type PlayStatus = { #NOT_READY; #ALL_READY; #PLAYING; #GAME_END };

    // query용 immutable type
    public type GameStatus = {
        playStatus : PlayStatus;
        totalBettingAmount : Nat;
        whoseTurn : ?Principal;
        masterPlayer : ?Principal;
        cardDeck : CardDeck;
        isAllCall : Bool;
    };

    public type MutableGameStatus = {
        var playStatus : PlayStatus;
        var totalBettingAmount : Nat;
        var whoseTurn : ?Principal;
        var masterPlayer : ?Principal;
        var cardDeck : MutableCardDeck;
        var isAllCall : Bool;
    };
};