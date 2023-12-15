import List "mo:base/List";
import Iter "mo:base/Iter";
import Types "types";
import random_number "canister:random_number";
import Option "mo:base/Option";
import Prelude "mo:base/Prelude";
import D "mo:base/Debug";
import Nat "mo:base/Nat";
import Random "mo:base/Random";
import Array "mo:base/Array";
import Principal "mo:base/Principal";



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

    // ################################################################################
    // ########################### CONVERT FUNCTIONS ##################################
    // ################################################################################

    public func convertToSharedPlayer(player : ?Player) : ?SharedPlayer {
        switch (player) {
            case null return null;
            case (?player) {
                let sharedPlayer : SharedPlayer = {
                    address = player.address;
                    playingState = player.playingState;
                    playerOrder = player.playerOrder;
                    cards = List.toArray(player.cards);
                    // totalCardNumber = player.totalCardNumber;
                    currentChips = player.currentChips;
                    totalBetAmount = player.totalBetAmount;
                    currentBetAmount = player.currentBetAmount;
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
            cards = List.toArray(cardDeck.cards);
            numberOfCards = cardDeck.numberOfCards;
        };
        sharedCardDeck 
    };

    // ################################################################################
    // ######################### GAME STATUS FUNCTIONS ################################
    // ################################################################################

    public func cleanGameStatus(gameStatus : GameStatus) {
        gameStatus.playingStatus := #NOT_ALL_READY;
        gameStatus.masterPlayer := null;
        gameStatus.gameTurn := 0;
        gameStatus.isAllPlayerCall := false;
    };


    // ################################################################################
    // ########################### PLAYER FUNCTIONS ###################################
    // ################################################################################
   
   public func getNewPlayer(playerAddress : Principal) : Player {
        let player : Player = {
            var address = playerAddress;
            var playingState = #ENTER;
            var playerOrder = 0;
            var cards = List.nil<Card>();
            var totalCardNumber = 0;
            var currentChips = 0;
            var totalBetAmount = 0;
            var currentBetAmount = 0;
            var bettingAction = #NONE; 
        };
        player
    };

    public func setMasterPlayer(gameStatus : GameStatus, player : ?Principal) {
        gameStatus.masterPlayer := player;
    };

    // ################################################################################
    // ######################## BETTING CHIPS FUNCTIONS ###############################
    // ################################################################################

    // public func betPokerChips(gameTable: GameTable, playerAddress : Principal, amount : Nat) {
    //     gameTable.subPokerChip(playerAddress, amount);

    // };

    // public func exchangePokerChips(gameTable : GameTable, playerAddress : Principal, amount : Nat) {
    //     // ICP -> Chip으로 변경하는 로직으로 변경해야 함
    //     let player : ?Player = gameTable.getPlayer( playerAddress);
    //     switch (player) {
    //         case null return;
    //         case (?player){
    //             let updatedPlayer : Player = {
    //                 var address = player.address;
    //                 var playingState = player.playingState;
    //                 var playerOrder = player.playerOrder;
    //                 var cards = player.cards;
    //                 // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
    //                 var totalCardNumber = player.totalCardNumber;
    //                 var currentChips = player.currentChips + amount;
    //                 var totalBetAmount = player.totalBetAmount;
    //                 var betAmount = player.betAmount;
    //                 var bettingAction = player.bettingAction;

    //             };
    //             gameTable.setPlayer(playerAddress, updatedPlayer); 
    //         }
    //     }
    // };

    // ################################################################################
    // ######################## CARD DECK FUNCTIONS ###################################
    // ################################################################################

    public func fillCardDeck(gameTable : GameTable, numberOfCards : Nat) : async() {
        let shuffledNumberArray = await getShuffled52NumberArray();
        var suffledCardDeck : CardDeck = {
            var cards = List.nil<Card>();
            var numberOfCards = 0;
        };
        switch (shuffledNumberArray) {
            case null return;
            case (?shuffledNumberArray) {
            suffledCardDeck := getNewShuffledEncryptedCardDeck(shuffledNumberArray);
            };
        };
        
        gameTable.setWholeCardDeck(suffledCardDeck);
    };

    func getNewShuffledEncryptedCardDeck(shuffledNumberArray : [Nat]) :CardDeck {
        var cardDeck : CardDeck = {
            var cards = List.nil<Card>();
            var numberOfCards = 0;
        };

        for (i in Iter.range(0, Array.size(shuffledNumberArray)-1 )) {
            let encryptedCardNumber = encrypt_card_number(shuffledNumberArray[i], i);
            let card : Card = {
                cardNumber = encryptedCardNumber;
                order = i;
            };
            let cards = List.push<Card>(card, cardDeck.cards);
            cardDeck.cards := cards;
            cardDeck.numberOfCards += 1;
        };

        cardDeck.cards := List.reverse(cardDeck.cards);
        cardDeck
    };


// 3개의 random number를 이용해서 number list를 섞어서 리턴함
    public func getShuffled52NumberArray() : async ?[Nat] {
        var numberList = List.nil<Nat>();
        for (i in Iter.range(1, 52)) {
            numberList := List.push<Nat>(i, numberList);
        };
        numberList := List.reverse(numberList);

        var randomNumber1 :?Nat = await generateRandomNumberForCard();
        var randomNumber2 :?Nat = await generateRandomNumberForCard();
        var randomNumber3 :?Nat = await generateRandomNumberForCard();
        var shuffleNumbers : [var Nat] = Array.init<Nat>(6, 0);

        switch (randomNumber1) {
            case null return null;
            case (?randomNumber1) {
                if (randomNumber1 <= 1 ){
                    shuffleNumbers[0] := 7;
                    shuffleNumbers[5] := 11;
                } else {
                    shuffleNumbers[0] := randomNumber1;
                    shuffleNumbers[5] := randomNumber1 + 5;
                };
            };
        };
        switch (randomNumber2) {
            case null return null;
            case (?randomNumber2) {
                if (randomNumber2 <= 1 ){
                    shuffleNumbers[1] := 13;
                    shuffleNumbers[4] := 17;
                } else {
                    shuffleNumbers[1] := randomNumber2 + 5;
                    shuffleNumbers[4] := randomNumber2 + 7;
                };
            };
        };
        switch (randomNumber3) {
            case null return null;
            case (?randomNumber3) {
                if (randomNumber3 <= 1 ){
                    shuffleNumbers[2] := 19;
                    shuffleNumbers[3] := 23;
                } else {
                    shuffleNumbers[2] := randomNumber3 + 10;
                    shuffleNumbers[3] := randomNumber3 + 3;
                }
            };
        };

        let shuffledNumberList = shuffleNumberList(numberList, shuffleNumbers);

        ?List.toArray(shuffledNumberList)
    };

    func shuffleNumberList(numberList : List.List<Nat>, shuffleNumbers : [var Nat]) : List.List<Nat> {
        var shuffledNumberList = shuffleNumberListOnce(numberList, shuffleNumbers[0]);
        for (i in Iter.range(1, 40)) {
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[0]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[1]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[4]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[2]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[3]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[4]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[5]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[0]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[1]);
            shuffledNumberList := shuffleNumberListOnce(shuffledNumberList, shuffleNumbers[2]);
        }; 

        shuffledNumberList
    };

    func shuffleNumberListOnce(numberList : List.List<Nat>, bundle : Nat) : List.List<Nat> {
        var numbers = List.reverse(numberList);
        var shuffledNumberList = List.nil<Nat>();
        let size : Nat = List.size(numberList);

        var loopCount = 0;
        if (size % bundle == 0){
            loopCount := size / bundle;
        } else {
            loopCount := (size / bundle) + 1;
        };

        // 화투 패 처럼 섞는 행위를 하는 부분
        for (i in Iter.range(1, loopCount)) {
            var tempNumberList = List.nil<Nat>();
            // bundle 수만큼 number들을 다른 List에 옮겨 담음
            label f for (i in Iter.range(1, bundle)){
                let (number, afterNubmers) = List.pop<Nat>(numbers);
                numbers := afterNubmers;
                switch (number) {
                    case null continue f;
                    case (?number) {
                        tempNumberList := List.push<Nat>(number, tempNumberList);
                    };
                };
            };
            // 뺀 걸 뒤에 넣는다.
            shuffledNumberList := List.append<Nat>(shuffledNumberList, tempNumberList);
        };
        
        shuffledNumberList
    };

    public func generateRandomNumberForCard() : async ?Nat {
        let entropy = await Random.blob(); // get initial entropy
        var f = Random.Finite(entropy);
        do ? {
            var result =f.range(4)!%9;
            return ?result;
        };
    };

    public func generateRandomNumberForPlayer() : async ?Nat {
        let entropy = await Random.blob(); // get initial entropy
        var f = Random.Finite(entropy);
        do ? {
            var result =f.range(52)!;
            result := result;
            return ?result;
        };
    };

    // ################################################################################
    // ###################### ENCRYPTION FUNCTIONS ###################################
    // ################################################################################

    // let x : Nat, y : Nat
    // y = 123 * x + 56789 
    // x = (y - 56789)/123
    func encrypt_card_number(card_number: Nat, order: Nat): Nat {
        let encrypted_number = 12 * card_number * (order + 33) + 45 * card_number + 56789;
        encrypted_number
    };

    func decrypt_card_number(encrypted_number: Nat, order: Nat): Nat {
        let decrypted_number = (encrypted_number - 56789) / (12 * (order + 33) + 45);
        decrypted_number
    };

    func encrypt_card_number_for_player(card_number: Nat, order: Nat, playerCryptoNum : Nat): Nat {
        let encrypted_number = 12 * card_number * (order + 3) + 45 * card_number + playerCryptoNum;
        encrypted_number
    };

    func decrypt_card_number_for_player(encrypted_number: Nat, order: Nat, playerCryptoNum : Nat): Nat {
        let decrypted_number = (encrypted_number - playerCryptoNum) / (12 * (order + 3) + 45);
        decrypted_number
    };

    // // TODO : CardDeck 통째로 encrpyt
    // func encryptCardDeck(gameTable : GameTable) : async Card {
    //     let cardNumber = Option.get((await random_number.generateRandomNumber(),0));
    //     // encryptedCardNumber = getEncryptedCardNumber(cardNumber);
    //     let cardDeck : CardDeck = gameTable.getCardDeck();
    //     let cardOrder : Nat = cardDeck.numberOfCards + 1;
    //     let card : Card = {
    //             cardNumber = cardNumber;
    //             // cardNumber = encryptedCardNumber;
    //             order = cardOrder;
    //     };
    //     card
    // };

     // 여기에 encrypt card, decrypt card 가 필요하긴 함.....
    public func drawDecryptedCardToPlayer(gameTable : GameTable, playerAddress : Principal) {
        let playerBettingAction = gameTable.getPlayerBettingAction(playerAddress);
        if (playerBettingAction != #FOLD) {
            let card = gameTable.drawCardFromDeck();
            switch (card) {
                case null return;
                case (?card) {
                    let playerCryptoNum = gameTable.getPlayerCryptoNumber(playerAddress);
                    switch (playerCryptoNum) {
                        case null return;
                        case (?playerCryptoNum){
                            var cardNumberDecryptedByDealer = decrypt_card_number(card.cardNumber, card.order);
                            var cardNumberEncryptedByPlayer = encrypt_card_number_for_player(cardNumberDecryptedByDealer, card.order, playerCryptoNum);
                            let newCard : Card = {
                                cardNumber : Nat = cardNumberEncryptedByPlayer;
                                order : Nat = card.order;
                            };
                            var test_decryptedByPlayer = decrypt_card_number_for_player(cardNumberEncryptedByPlayer, card.order, playerCryptoNum);
                            gameTable.addCardIntoPlayer(playerAddress, newCard);
                        };
                    };
                };
            };

        };
        
    };

    public func drawCardEveryPlayers(gameTable : GameTable) {
        var players = gameTable.getPlayers();
        for (player in players.vals()) { 
            drawDecryptedCardToPlayer(gameTable, player.address);
        };
    };

}