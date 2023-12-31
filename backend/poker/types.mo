import List "mo:base/List";
import Stack "mo:base/Stack";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

module Types {
    public type GamePlayingState = { #NOT_ALL_READY; #ALL_READY; #PLAYING; #GAME_END};
    public type PlayerPlayingState = { #ENTER; #READY; #PLAYING; #END};
    public type BettingAction = { #FOLD; #CHECK; #RAISE; #CALL; #NONE;};

    public type Player = {
        var address : Principal;
        var playingState : PlayerPlayingState;
        var playerOrder: Nat;
        var cards : List.List<Card>;
        // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
        // var totalCardNumber : Nat;
        var currentChips : Nat;
        var totalBetAmount : Nat;
        var currentBetAmount : Nat;
        var bettingAction : BettingAction;
    };

    public type SharedPlayer = {
        address : Principal;
        playingState : PlayerPlayingState;
        playerOrder: Nat;
        cards : [Card];
        // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
        // totalCardNumber : Nat;
        currentChips : Nat;
        totalBetAmount : Nat;
        currentBetAmount : Nat;
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
        cards : [Card];
        numberOfCards : Nat;
    };

    public type MoneyBox = {
        var totalBetAmount : Nat;
    };

    public type ChipExchange =  HashMap.HashMap<Principal, Nat>; 

    public type GameStatus = {
        var playingStatus : GamePlayingState;
        var masterPlayer : ?Principal;
        var gameTurn : Nat;
        var isAllPlayerCall : Bool;
        var winner : ?Principal;
    };

    public type SharedGameStatus = {
        playingStatus : GamePlayingState;
        masterPlayer : ?Principal;
        gameTurn : Nat;
        isAllPlayerCall : Bool;
        winner : ?Principal;
    };

    public type GameTable = {
        getPlayers : () -> PlayerSeats;
        getPlayerArray : () -> [Player];
        getCardDeck : () -> CardDeck;
        getUsedCardDeck : () -> CardDeck;
        getMoneyBox : () -> MoneyBox;

        getPlayer : Principal -> ?Player;
        setPlayer : (Principal, Player) -> ();
        getPlayerBettingAction : (Principal) -> (BettingAction);
        getPlayerTotalCardNumber : (Principal) -> (Nat);
        createNewPlayer : (Principal) -> ();
        removePlayer : (Principal) -> ();
        removeAllPlayer : () -> ();
        setPlayerPlayingState : (Principal, PlayerPlayingState) -> ();
        setPlayerOrder : (Principal, Nat) -> ();

        setWholeCardDeck : (CardDeck) -> ();
        addCardIntoPlayer : (Principal, Card) -> ();
        addCardIntoDeck : (Card) -> ();
        addCardIntoUsedDeck : (Card) -> ();
        drawCardFromDeck :() -> ?Card;

        getPlayerCryptoNumber : (Principal) -> ?Nat;

        getTotalBetAmountInMoneybox : () -> (Nat);
        setCurrentChips : (Principal, Nat) -> ();
        betChips : (Principal, Nat) -> ();
        setBettingAction : (Principal, BettingAction) -> ();

        getExchangeBalance : (Principal) ->(?Nat);
        depositICPAddPokerChip : (Principal, Nat) -> ();
        withdrawICPSubtractPokerChip : (Principal, Nat) -> ();
        addPokerChip : (Principal, Nat) -> ();
        subPokerChip : (Principal, Nat) -> ();

        cleanPlayerCards : Principal -> ();
        cleanPlayerBettingInfo : (Principal) -> ();
        initalizePlayerInfo : (Principal) -> ();
        initalizePlayersInfo : () -> ();

        updatePlayingStatus : () -> ();
        checkIsAllCall : () -> ();
    };
};