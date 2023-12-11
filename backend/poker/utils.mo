import List "mo:base/List";
import Iter "mo:base/Iter";
import Types "types";
import random_number "canister:random_number";
import Option "mo:base/Option";
import Prelude "mo:base/Prelude";
import D "mo:base/Debug";
import Nat "mo:base/Nat";
import Random "mo:base/Random";



module Utils {
    type Player = Types.Player;
    type SharedPlayer = Types.SharedPlayer;
    type PlayerSeats = Types.PlayerSeats;
    type GameStatus = Types.GameStatus;
    type SharedGameStatus = Types.SharedGameStatus;
    type GameTable = Types.GameTable;
    type Card = Types.Card;
    type CardDeck = Types.CardDeck;
    type SharedCardDeck = Types.SharedCardDeck;
    type BettingAction = Types.BettingAction;

    // test 용
    let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 52;

    public func convertToSharedPlayer(player : ?Player) : ?SharedPlayer {
        switch (player) {
            case null return null;
            case (?player) {
                let sharedPlayer : SharedPlayer = {
                    address = player.address;
                    isReady = player.isReady;
                    cards = player.cards;
                    totalCardNumber = player.totalCardNumber;
                    currentChips = player.currentChips;
                    totalBetAmount = player.totalBetAmount;
                    betAmount = player.betAmount;
                    bettingAction = player.bettingAction;
                };
                return ?sharedPlayer;
            };
        };
    };

    public func convertToSharedGameStatus(gameStatus : GameStatus) : SharedGameStatus {
        let sharedGameStatus : SharedGameStatus = {
            playingStatus = gameStatus.playingStatus;
            masterPlayer = gameStatus.masterPlayer;
            gameTurn = gameStatus.gameTurn;
            isAllPlayerCall = gameStatus.isAllPlayerCall;
        };
        sharedGameStatus
    };

    public func convertToSharedCardDeck(cardDeck : CardDeck) : SharedCardDeck {
        let sharedCardDeck : SharedCardDeck = {
            cards = cardDeck.cards;
            numberOfCards = cardDeck.numberOfCards;
        };
        sharedCardDeck 
    };

   
   public func getNewPlayer(playerAddress : Principal) : Player {
        let player : Player = {
            var address = playerAddress;
            var isReady = false;
            var cards = List.nil<Card>();
            var totalCardNumber = 0;
            var currentChips = 0;
            var totalBetAmount = 0;
            var betAmount = 0;
            var bettingAction = #NONE; 
        };
        player
    };

    public func exchangePokerChips(gameTable : GameTable, playerAddress : Principal, amount : Nat) {
        // ICP -> Chip으로 변경하는 로직으로 변경해야 함
        let player : ?Player = gameTable.getPlayer( playerAddress);
        switch (player) {
            case null return;
            case (?player){
                let updatedPlayer : Player = {
                    var address = player.address;
                    var isReady = player.isReady;
                    var cards = player.cards;
                    // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
                    var totalCardNumber = player.totalCardNumber;
                    var currentChips = player.currentChips + amount;
                    var totalBetAmount = player.totalBetAmount;
                    var betAmount = player.betAmount;
                    var bettingAction = player.bettingAction;

                };
                gameTable.setPlayer(playerAddress, ?updatedPlayer); 
            }
        }
    };

    public func setMasterPlayer(gameStatus : GameStatus, player : ?Principal) {
        gameStatus.masterPlayer := player;
    };

    public func fillCardDeck(gameTable : GameTable, numberOfCards : Nat) : async() {
        let cardDeck : CardDeck = getNewCardDeck(numberOfCards);
        var suffledCardDeck : CardDeck = {
            var cards = List.nil<Card>();
            var numberOfCards = 0;
        } ; 
        var randomNumber1 :?Nat = await generateRandomNumber();
        var randomNumber2 :?Nat = await generateRandomNumber();
        var randomNumber3 :?Nat = await generateRandomNumber();
        var shuffleNumber1 :Nat = 0;
        var shuffleNumber2 :Nat = 0;
        var shuffleNumber3 :Nat = 0;
        var shuffleNumber4 :Nat = 0;
        var shuffleNumber5 :Nat = 0;
        var shuffleNumber6 :Nat = 0;

        switch (randomNumber1) {
            case null return ;
            case (?randomNumber1) {
                if (randomNumber1 <= 1 ){
                    shuffleNumber1 := 7;
                    shuffleNumber6 := 11;
                } else {
                    shuffleNumber1 := randomNumber1;
                    shuffleNumber6 := randomNumber1 + 5;
                };
            };
        };
        switch (randomNumber2) {
            case null return ;
            case (?randomNumber2) {
                if (randomNumber2 <= 1 ){
                    shuffleNumber2 := 13;
                    shuffleNumber5 := 17;
                } else {
                    shuffleNumber2 := randomNumber2 + 5;
                    shuffleNumber5 := randomNumber2 + 7;
                };
            };
        };
        switch (randomNumber3) {
            case null return ;
            case (?randomNumber3) {
                if (randomNumber3 <= 1 ){
                    shuffleNumber3 := 19;
                    shuffleNumber4 := 23;
                } else {
                    shuffleNumber3 := randomNumber3 + 10;
                    shuffleNumber4 := randomNumber3 + 3;
                }
            };
        };

        suffledCardDeck := Utils.shuffleCardDeck(cardDeck, shuffleNumber1);
        for (i in Iter.range(1, 20)) {
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber1);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber2);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber5);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber3);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber4);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber5);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber6);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber1);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber2);
            suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber3);
        };

        suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber1);
        suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber2);
        suffledCardDeck := Utils.shuffleCardDeck(suffledCardDeck, shuffleNumber3);

        gameTable.setCardDeck(suffledCardDeck);
    };

    func getNewCardDeck(numberOfCards : Nat) : CardDeck {
        var cardDeck : CardDeck = {
            var cards = List.nil<Card>();
            var numberOfCards = 0;
        };
        for (i in Iter.range(1, numberOfCards)) {
            let card : Card = {
                cardNumber = i;
                order = i;
            };
            let cards = List.push<Card>(card, cardDeck.cards);
            cardDeck.cards := cards;
            cardDeck.numberOfCards += 1;
        };

        cardDeck.cards := List.reverse(cardDeck.cards);
        cardDeck
    };

    public func shuffleCardDeck(cardDeck : CardDeck, shuffleNumber : Nat) : CardDeck {
        var cards = List.reverse(cardDeck.cards);
        var shuffledCards = List.nil<Card>();

        var loopNum = 0;
        if (NUMBER_OF_CARDS_IN_CARD_DECK % shuffleNumber == 0){
            loopNum := NUMBER_OF_CARDS_IN_CARD_DECK / shuffleNumber;
        } else {
            loopNum := (NUMBER_OF_CARDS_IN_CARD_DECK / shuffleNumber) + 1;
        };

        for (i in Iter.range(1, loopNum)) {
            var tempCardList = List.nil<Card>();
            label f for (i in Iter.range(1, shuffleNumber)){
                let (card, afterCards) = List.pop<Card>(cards);
                cards := afterCards;
                switch (card) {
                    case null continue f;
                    case (?card) {
                        tempCardList := List.push<Card>(card, tempCardList);
                    };
                };
            };
            shuffledCards := List.append<Card>(shuffledCards, tempCardList);
        };
        cardDeck.cards := shuffledCards;
        cardDeck
    };

    func generateRandomNumber() : async ?Nat {
        let entropy = await Random.blob(); // get initial entropy
        var f = Random.Finite(entropy);
        do ? {
            var result =f.range(4)!%9;
            return ?result;
        };
    };

    // TODO : CardDeck 통째로 encrpyt
    func encryptCardDeck(gameTable : GameTable) : async Card {
        let cardNumber = Option.get((await random_number.generateRandomNumber(),0));
        // encryptedCardNumber = getEncryptedCardNumber(cardNumber);
        let cardDeck : CardDeck = gameTable.getCardDeck();
        let cardOrder : Nat = cardDeck.numberOfCards + 1;
        let card : Card = {
                cardNumber = cardNumber;
                // cardNumber = encryptedCardNumber;
                order = cardOrder;
        };
        card
    };

     // 여기에 encrypt card, decrypt card 가 필요하긴 함.....
    public func drawCardToPlayer(gameTable : GameTable, playerAddress : Principal) {
        let card = gameTable.drawCardFromDeck();
        switch (card) {
            case null return;
            case (?card) {
                gameTable.addCardIntoPlayer(playerAddress, card);
            };
        };
    };

    public func drawCardEveryPlayers(gameTable : GameTable) {
        var players = gameTable.getPlayers();
        for (player in players.vals()) { 
            drawCardToPlayer(gameTable, player.address);
        };
    };

}