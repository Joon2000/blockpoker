import List "mo:base/List";
import Stack "mo:base/Stack";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

module Types {
    public type PlayingStatus = { #NOT_ALL_READY; #ALL_READY; #PLAYING; #GAME_END };
    public type BettingAction = { #FOLD; #CHECK; #RAISE; #CALL; #NONE;};

    public type Player = {
        var address : Principal;
        var isReady : Bool;
        var cards : List.List<Card>;
        // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
        var totalCardNumber : Nat;
        var currentChips : Nat;
        var totalBetAmount : Nat;
        var betAmount : Nat;
        var bettingAction : BettingAction;
    };

    public type SharedPlayer = {
        address : Principal;
        isReady : Bool;
        cards : List.List<Card>;
        // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
        totalCardNumber : Nat;
        currentChips : Nat;
        totalBetAmount : Nat;
        betAmount : Nat;
        bettingAction : BettingAction;
    };

    public type PlayerSeats = HashMap.HashMap<Principal, Player>;

    public type Card = {
        cardNumber : Nat;
        order : Nat;
    };

    public type CardDeck = {
        var cards : List.List<Card>;
        var numberOfCards : Nat;
    };

    public type SharedCardDeck = {
        cards : List.List<Card>;
        numberOfCards : Nat;
    };

    public type MoneyBox = {
        var totalBetAmount : Nat;
    };

    public type GameStatus = {
        var playingStatus : PlayingStatus;
        var masterPlayer : ?Principal;
        var gameTurn : ?Principal;
        var isAllPlayerCall : Bool;
    };

    public type SharedGameStatus = {
        playingStatus : PlayingStatus;
        masterPlayer : ?Principal;
        gameTurn : ?Principal;
        isAllPlayerCall : Bool;
    };

    public type GameTable = {
        getPlayer : Principal -> ?Player;
        getPlayers : () -> PlayerSeats;
        getPlayerList : () -> List.List<Player>;
        getCardDeck : () -> CardDeck;
        getUsedCardDeck : () -> CardDeck;
        getMoneyBox : () -> MoneyBox;

        setPlayer : (Principal, ?Player) -> ();
        // setNewPlayer : (Principal) -> ();
        removePlayer : (Principal) -> ();
        setPlayerIsReady : (Principal, Bool) -> ();
        setCardDeck : (CardDeck) -> ();
        addCardIntoPlayer : (Principal, Card) -> ();
        addCardIntoDeck : (Card) -> ();
        drawCardFromDeck :() -> ?Card;

        // drawCardToPlayer : Principal -> ();
        cleanPlayerCards : Principal -> ();
        setBetAmount : (Principal, Nat) -> ();
        setBettingAction : (Principal, BettingAction) -> ();
    };
};