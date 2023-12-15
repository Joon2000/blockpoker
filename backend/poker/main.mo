import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Prelude "mo:base/Prelude";
import Hash "mo:base/Hash";
import random_number "canister:random_number";
import Types "types";
import Utils "utils";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Test "test";
import Stack "mo:base/Stack";
import D "mo:base/Debug";


actor {
    type Player = Types.Player;
    type SharedPlayer = Types.SharedPlayer;
    type PlayerSeats = Types.PlayerSeats;
    type Card = Types.Card;
    type CardDeck = Types.CardDeck;
    type SharedCardDeck = Types.SharedCardDeck;
    type MoneyBox = Types.MoneyBox;
    type ChipExchange = Types.ChipExchange;
    type GameTable = Types.GameTable;
    type GameStatus = Types.GameStatus;
    type SharedGameStatus = Types.SharedGameStatus;
    type BettingAction = Types.BettingAction;
    type PlayerPlayingState = Types.PlayerPlayingState;

    // 게임 참여 최대 인원 수 4명
    let MAX_PLAYER = 4;

    let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 52;
    // let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 20;
    
    var gameStatus : GameStatus = {
        var playingStatus = #NOT_ALL_READY;
        var masterPlayer = null;
        var gameTurn = 0;
        var isAllPlayerCall = false;
        var winner = null;
    };

    object gameTable = {
        var players : PlayerSeats = HashMap.HashMap<Principal, Player>(MAX_PLAYER, Principal.equal , Principal.hash);
        var cardDeck : CardDeck = {
            var cards = List.nil<Card>();
            var numberOfCards = 0;
        };
        var usedCardDeck : CardDeck = {
            var cards = List.nil<Card>();
            var numberOfCards = 0;
        };
        var moneyBox : MoneyBox = {
            var totalBetAmount = 0;
        };

        // TODO : 나중에 stable로 관리하기
        var chipExchange : ChipExchange = HashMap.HashMap<Principal, Nat>(100, Principal.equal , Principal.hash);

        var cryptoNum = HashMap.HashMap<Principal, Nat>(4, Principal.equal, Principal.hash);

        // #######################################################
        // ################ GameTable Methods ####################
        // ################### Get Methods #######################

        // ########################
        // ###### Components ######
        // ########################

        public func getPlayers() : PlayerSeats{
            players
        };

        public func getPlayerArray() : [Player] {
            let players : PlayerSeats = gameTable.getPlayers();
            var playerList : List.List<Player> = List.nil<Player>();
            for (player in players.vals()) {
                playerList := List.push<Player>(player, playerList);
            };
            List.toArray(playerList)
        };

   

        public func getCardDeck() : CardDeck {
            cardDeck
        };

        public func getUsedCardDeck() : CardDeck {
            usedCardDeck
        };
        
        public func getMoneyBox() : MoneyBox {
            moneyBox
        };
        
        // #######################################################
        // ################ GameTable Methods ####################
        // ################# Update Methods ######################

        // ########################
        // ######## Player ########
        // ########################
        public func getPlayer(playerAddress : Principal) : ?Player {
            var player : ?Player = players.get(playerAddress);
            player
        };

        public func getPlayerWithPlayerOrder(playerOrder : Nat) : ?Player {
            for (player in players.vals()) {
                if (player.playerOrder == playerOrder) {
                    return ?player;
                };
            };
            null
        };

        public func getPlayerBettingAction(playerAddress : Principal) : BettingAction {
            var player : ?Player = players.get(playerAddress);
            switch (player) {
                case null return #NONE;
                case (?player) {
                    return player.bettingAction;
                };
            };
        };

        // TODO : getPlayerCardCombination 으로 바꿔야함. poker로 만들고 싶으면...
        public func getPlayerTotalCardNumber(playerAddress : Principal) : Nat{
            let cards = getPlayerDecryptedCardArray(playerAddress);
            var totalCardNumber = 0;
            // D.print("getPlayerTotalCardNumber");
            // D.print(Principal.toText(playerAddress));
            for (card in cards.vals()) {
                totalCardNumber += card.cardNumber % 13 + 1;
                // D.print(Nat.toText(card.cardNumber));
                // let playerCryptoNum = getPlayerCryptoNumber(playerAddress);
                // switch (playerCryptoNum) {
                //     case null return 0;
                //     case (?playerCryptoNum) {
                //         // let decryptedCardNumber = Utils.decrypt_card_number_for_player(card.cardNumber, card.order, playerCryptoNum);
                //         totalCardNumber += decryptedCardNumber % 13 + 1;
                //     };
                // };
            };
            totalCardNumber
        };

        func getPlayerDecryptedCardArray(playerAddress : Principal) : [Card] {
            decryptPlayerWholeCards(playerAddress);
            var player : ?Player = players.get(playerAddress);
            switch (player) {
                case null return [];
                case (?player) {
                    return List.toArray(player.cards);
                };
            };
        };

        func decryptPlayerWholeCards(playerAddress : Principal){
            var player : ?Player = players.get(playerAddress);
            var decryptedCardList = List.nil<Card>();
            switch (player) {
                case null return;
                case (?player) {
                    let playerCryptoNum = getPlayerCryptoNumber(playerAddress);
                    for (card in List.toIter<Card>(player.cards)){
                        let decryptedCardNumber = Utils.decrypt_card_number_for_player(card.cardNumber, card.order, Option.unwrap(playerCryptoNum));
                        let newCard : Card = {
                            cardNumber = decryptedCardNumber;
                            order = card.order;
                        };
                        decryptedCardList := List.push<Card>(newCard, decryptedCardList);
                    };
                    player.cards := List.reverse(decryptedCardList);
                    setPlayer(playerAddress, player);
                };
            };
        };

        public func setPlayer(playerAddress : Principal, player : Player) {
            let player : ?Player = players.get(playerAddress);
            switch (player) {
                case null return;
                case (?player) {
                    players.put(playerAddress, player);
                };
            };
        };

        public func createNewPlayer(playerAddress : Principal) {
            let newPlayer = getNewPlayer(playerAddress);
            players.put(playerAddress, newPlayer);
        };
        
        public func removePlayer(playerAddress : Principal) {
            players.delete(playerAddress);
        };

        public func removeAllPlayer() {
            for (player in players.vals()){
                removePlayer(player.address);
            };
        };

        public func setPlayerPlayingState(playerAddress : Principal, playingState : PlayerPlayingState) {
            var player : ?Player = getPlayer(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.playingState := playingState;
                    setPlayer(playerAddress, player);
                };
            };
        };

        public func setPlayerOrder(playerAddress : Principal, playerOrder : Nat) {
            var player : ?Player = getPlayer(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.playerOrder := playerOrder;
                    setPlayer(playerAddress, player);
                };
            };
        };

        // ########################
        // ######### Card #########
        // ########################

        public func setWholeCardDeck(newCardDeck : CardDeck) {
            cardDeck := newCardDeck;
        };

        public func addCardIntoPlayer(playerAddress : Principal, card : Card) {
            var player : ?Player = getPlayer(playerAddress);
            switch (player) {
                case null return;
                case (?player) {
                    player.cards := List.push(card, player.cards);
                    // player.totalCardNumber := player.totalCardNumber + card.cardNumber % 13 + 1;
                    setPlayer(playerAddress, player)
                };
            };
        };

        public func addCardIntoDeck(card : Card) {
            let cards = List.push<Card>(card, cardDeck.cards);
            cardDeck.cards := cards;
            cardDeck.numberOfCards += 1;
        };

        public func addCardIntoUsedDeck(card : Card) {
            let cards = List.push<Card>(card, usedCardDeck.cards);
            usedCardDeck.cards := cards;
            usedCardDeck.numberOfCards += 1;
        };

        public func drawCardFromDeck() : ?Card {
            let (card, cards) = List.pop<Card>(cardDeck.cards);
            cardDeck.cards := cards;
            cardDeck.numberOfCards -= 1;
            card
        };

        // ########################
        // ######## Crypto #########
        // ########################

        public func setPlayerCryptoNumber(playerAddress : Principal, crpytoNumber : Nat) {
            cryptoNum.put(playerAddress, crpytoNumber);
        };

        public func getPlayerCryptoNumber(playerAddress : Principal) : ?Nat {
            cryptoNum.get(playerAddress);
        };

        // ########################
        // ####### Betting ########
        // ########################
        public func getTotalBetAmountInMoneybox() : Nat {
            moneyBox.totalBetAmount
        };

        public func setCurrentChips(playerAddress : Principal, chipAmount : Nat) {
            var player : ?Player = getPlayer(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.currentChips := chipAmount;
                    setPlayer(playerAddress, player);
                };
            }; 

        };

        public func betChips(playerAddress : Principal, betAmount : Nat) {
            var player : ?Player = getPlayer(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    assert(player.currentChips > betAmount);

                    player.currentBetAmount := betAmount;
                    player.currentChips -= betAmount;
                    subPokerChip(playerAddress, betAmount);
                    player.totalBetAmount += betAmount;
                    setPlayer(playerAddress, player);

                    moneyBox.totalBetAmount += betAmount;
                };
            }; 
        };

        public func setBettingAction(playerAddress : Principal, bettingAction : BettingAction) {
           var player : ?Player = getPlayer(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.bettingAction := bettingAction;
                    setPlayer(playerAddress, player);
                };
            };  
        };

        // ########################
        // #### Exchange Chip ######
        // ########################
        func checkPlayerInExchange(playerAddress : Principal) {
            var balance : ?Nat = chipExchange.get(playerAddress);
            switch (balance) {
                case null {
                    chipExchange.put(playerAddress, 0);
                };
                case (?balance) return;
            };

        };

        public func getExchangeBalance(playerAddress : Principal) : ?Nat{
            checkPlayerInExchange(playerAddress);
            var balance : ?Nat = chipExchange.get(playerAddress);
            balance
        };

        public func addPokerChip(playerAddress : Principal, chipAmount : Nat){
            checkPlayerInExchange(playerAddress);

            var balance : ?Nat = chipExchange.get(playerAddress);
            switch (balance) {
                case null return;
                case (?balance) {
                    let postExchangeBalance = balance + chipAmount;
                    chipExchange.put(playerAddress, postExchangeBalance);
                    
                };
            };

        };

        public func subPokerChip(playerAddress : Principal, chipAmount : Nat) {
            checkPlayerInExchange(playerAddress);

            var balance : ?Nat = chipExchange.get(playerAddress);
            switch (balance) {
                case null return;
                case (?balance) {
                    assert(balance > chipAmount);
                    let postExchangeBalance = balance - chipAmount;
                    chipExchange.put(playerAddress, postExchangeBalance);
                    
                };
            };
        };

        // TODO : parameter -> IPC amount 추가
        public func depositICPAddPokerChip(playerAddress : Principal, chipAmount : Nat){
            // deposint ICP
            //
            //

            addPokerChip(playerAddress, chipAmount);
        };

        // TODO : parameter -> IPC amount 추가
        public func withdrawICPSubtractPokerChip(playerAddress : Principal, chipAmount : Nat){
            subPokerChip(playerAddress, chipAmount);

            // withdraw ICP
            //
            //
        };

        // ########################
        // ######## Clean #########
        // ########################

        public func cleanPlayerCards(playerAddress : Principal) {
            var player : ?Player = getPlayer(playerAddress);
            var usedPlayerCards = List.nil<Card>();
            switch (player){
                case null return;
                case (?player) {
                    usedCardDeck.cards := List.append<Card>( player.cards, usedCardDeck.cards);
                    usedCardDeck.numberOfCards += List.size<Card>(player.cards);

                    player.cards := List.nil<Card>();
                    // player.totalCardNumber := 0;
                    setPlayer(playerAddress, player);
                };
            }; 
        };

        public func cleanPlayerBettingInfo(playerAddress : Principal) {
           var player : ?Player = getPlayer(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.currentBetAmount := 0;
                    player.totalBetAmount := 0;
                    setBettingAction(playerAddress, #NONE);
                    setPlayer(playerAddress, player);
                };
            };  

        };

        public func initalizePlayerInfo(playerAddress : Principal) {
            let player = getPlayer(playerAddress);
            switch (player) {
                case null return;
                case (?player) {
                    setPlayerPlayingState(playerAddress, #ENTER);
                    cleanPlayerCards(playerAddress);
                    cleanPlayerBettingInfo(playerAddress);
                    setPlayer(playerAddress, player);
                    var balance = gameTable.getExchangeBalance(playerAddress);
                    setCurrentChips(playerAddress, Option.unwrap(balance));
                };
            };
        };

        public func initalizePlayersInfo() {
            for (player in players.vals()) {
                initalizePlayerInfo(player.address);
            };
        };

        // ########################
        // ######## Update ########
        // ########################
        func checkIsAllReady() {
            if (gameStatus.playingStatus == #PLAYING or gameStatus.playingStatus == #GAME_END) {
                return
            };
            if (players.size() < 2) {
                gameStatus.playingStatus := #NOT_ALL_READY;
            };
            var readyCount = 0;
            for (player in players.vals()) {
                if (player.playingState == #READY ) {
                    readyCount += 1;
                };
            };
            if (readyCount == players.size()) {
                gameStatus.playingStatus := #ALL_READY;
            } else {
                gameStatus.playingStatus := #NOT_ALL_READY;
            };
        };


        func checkIsGameEnd() {
            if (gameStatus.playingStatus == #NOT_ALL_READY or gameStatus.playingStatus == #ALL_READY ){
                return
            } else if (gameStatus.playingStatus == #PLAYING and players.size() <= 1) {
                gameStatus.playingStatus := #GAME_END;
            };

            // Game이 끝나는 로직 여기다가
        };

        public func updatePlayingStatus() {
            if (gameStatus.playingStatus == #NOT_ALL_READY or gameStatus.playingStatus == #ALL_READY) {
                checkIsAllReady();
            };

            if (gameStatus.playingStatus == #PLAYING) {
                checkIsGameEnd();                
            };
        }; 

        public func nextGameTurn(playerAddress : Principal) {
            let currentPlayer = getPlayer(playerAddress);
            switch (currentPlayer) {
                case null return;
                case (?currentPlayer) {
                    // var nextPlayerOrder = currentPlayer.playerOrder;
                    if (currentPlayer.playerOrder == gameStatus.gameTurn and currentPlayer.playerOrder == (Nat.sub(players.size(),1))) {
                        gameStatus.gameTurn := 0;
                        // nextPlayerOrder := 0;
                    } else if (currentPlayer.playerOrder == gameStatus.gameTurn and currentPlayer.playerOrder < (Nat.sub(players.size(),1))) {
                        gameStatus.gameTurn := currentPlayer.playerOrder + 1;
                        // nextPlayerOrder := currentPlayer.playerOrder + 1;
                    };

                    // let nextPlayer = getPlayerWithPlayerOrder(nextPlayerOrder);
                    // switch (nextPlayer) {
                    //     case null return;
                    //     case (?nextPlayer) {
                    //         if (nextPlayer.bettingAction == #FOLD){

                    //         };
                    //     };
                    // };
                };
            };
            // var currentPlayerAddress = playerAddress;
            
            // label f for (i in Iter.range(1, players.size())) {
            //     var nextTurn = getNextTurn(currentPlayerAddress);
            //     let nextPlayer = getPlayerWithPlayerOrder(nextTurn);
            //     switch (nextPlayer) {
            //         case null return;
            //         case (?nextPlayer) {
            //             if (nextPlayer.bettingAction == #FOLD){
            //                 currentPlayerAddress := nextPlayer.address;
            //             } else {
            //                 break f;
            //             };
            //         };
            //     };
            // };

            // let nextTurnPlayer = getPlayer(currentPlayerAddress);
            // switch (nextTurnPlayer) {
            //     case null return;
            //     case (?nextTurnPlayer) {
            //         gameStatus.gameTurn := nextTurnPlayer.playerOrder;
            //     };
            // };
        };

        // func getNextTurn(playerAddress : Principal) : Nat{
        //     let currentPlayer = getPlayer(playerAddress);
        //     var nextPlayerOrder = 0;
        //     switch (currentPlayer) {
        //         case null return 0;
        //         case (?currentPlayer) {
        //             if (currentPlayer.playerOrder == gameStatus.gameTurn and currentPlayer.playerOrder == (Nat.sub(players.size(),1))) {
        //                 nextPlayerOrder := 0;
        //             } else if (currentPlayer.playerOrder == gameStatus.gameTurn and currentPlayer.playerOrder < (Nat.sub(players.size(),1))) {
        //                 nextPlayerOrder := currentPlayer.playerOrder + 1;
        //             };
        //         };
        //     };
        //     nextPlayerOrder
        // };

        public func checkIsFold(playerAddress : Principal) : Bool {
            let currentPlayer = getPlayer(playerAddress);
            switch (currentPlayer) {
                case null return true;
                case (?currentPlayer) {
                    if (currentPlayer.bettingAction == #FOLD) {
                        return true;
                    };
                };
            };
            return false;
        };

        public func checkIsAllCall() {
            if (gameStatus.playingStatus != #PLAYING) {
                return
            };
            var callCount = 0;
            for (player in players.vals()) {
                if (player.bettingAction == #CALL or player.bettingAction == #FOLD){
                    callCount += 1;
                };
            };
            if (players.size() == callCount){
                gameStatus.isAllPlayerCall := true;
            } else {
               gameStatus.isAllPlayerCall := false; 
            };
        };

    };

    // ################################################################################
    // ########################### UTILS FUNCTIONS ####################################
    // ################################################################################

    func convertToSharedPlayer(player : ?Player) : ?SharedPlayer {
        Utils.convertToSharedPlayer(player)
    };

    func convertToSharedGameStatus(gameStatus : GameStatus) : SharedGameStatus {
        Utils.convertToSharedGameStatus(gameStatus)
    };

    func convertToSharedCardDeck(cardDeck : CardDeck) : SharedCardDeck {
        Utils.convertToSharedCardDeck(cardDeck);
    };

    func getNewPlayer(playerAddress : Principal) : Player {
        Utils.getNewPlayer(playerAddress);
    };

    // func exchangePokerChips(playerAddress : Principal, amount : Nat) {
    //     Utils.exchangePokerChips(gameTable, playerAddress, amount);  
    // };

    // func updatePlayingStatus(players : PlayerSeats) {
    //     Utils.updatePlayingStatus(gameStatus, players);
    // };
    
    func setMasterPlayer(player : ?Principal) {
        Utils.setMasterPlayer(gameStatus, player);
    };

    func fillCardDeck(numberOfCards : Nat): async() {
        await Utils.fillCardDeck(gameTable, NUMBER_OF_CARDS_IN_CARD_DECK);
    };

    func drawCardToPlayer(playerAddress : Principal) {
        Utils.drawEncryptedCardToPlayer(gameTable, playerAddress);
    };

    func drawCardEveryPlayers() {
        Utils.drawCardEveryPlayers(gameTable);
    };

    func cleanGameStatus() {
        Utils.cleanGameStatus(gameStatus);
    };

    func getWinnerPlayer() : Principal{
        Utils.getWinnerPlayer(gameTable)
    };

    // ################################################################################
    // ########################### QUERY FUNCTIONS ####################################
    // ################################################################################

    public query func getGameStatus() : async SharedGameStatus { 
        let sharedGameStatus : SharedGameStatus = convertToSharedGameStatus(gameStatus);
        sharedGameStatus
    };

    public query func getPlayerInfo(playerAddress : Principal) : async ?SharedPlayer {
        let playerInfo : ?Player = gameTable.getPlayer(playerAddress);
        let sharedPlayerInfo : ?SharedPlayer = convertToSharedPlayer(playerInfo);
        sharedPlayerInfo
    };

    public query func getPlayerInfoArray() : async [SharedPlayer] {
        var sharedPlayerInfoList : List.List<SharedPlayer> = List.nil<SharedPlayer>();
        let playerInfoArray = gameTable.getPlayerArray();

        // label forloop for (i in Iter.range(0, Array.size(playerInfoArray))) {
        label forloop for (player in playerInfoArray.vals()) {
            let playerInfo = ?player;
            // let playerInfo : ?Player = List.get(playerInfoList, i);
            let sharedPlayerInfo : ?SharedPlayer = convertToSharedPlayer(playerInfo);
            switch (sharedPlayerInfo) {
                case null continue forloop;
                case (?sharedPlayerInfo) {
                    sharedPlayerInfoList := List.push<SharedPlayer>(sharedPlayerInfo, sharedPlayerInfoList);
                }
            }; 
        };
        List.toArray(sharedPlayerInfoList)
    };

    public query func getTotalBetAmount() : async Nat {
        gameTable.getTotalBetAmountInMoneybox()
    };

    public query func getCardDeck() : async SharedCardDeck {
        let cardDeck = gameTable.getCardDeck();
        let sharedCardDeck = convertToSharedCardDeck(cardDeck);
        sharedCardDeck
    };

    public query func getPlayerCryptoNumber(playerAddress : Principal) : async Nat {
        var crpytoNumber = gameTable.getPlayerCryptoNumber(playerAddress);
        switch crpytoNumber {
            case null return 0;
            case (?crpytoNumber) {
                return crpytoNumber;
            }
        }
    };

    // ################################################################################
    // ########################### GAME FUNCTIONS ###################################
    // ################################################################################

    public func enterGame(playerAddress : Principal) {
        // 참여한 player 수가 최대 player 넘어가면 에러 발생하고 player 추가 하지 않음
        let players = gameTable.getPlayers();
        assert(players.size() < MAX_PLAYER);

        // player의 exchange에 있는 chip이 10개 미만일 경우 게임 참가 불가
        var balance = gameTable.getExchangeBalance(playerAddress);
        var currentChips = 0;
        switch (balance) {
            case null return;
            case (?balance) {
                // D.print(Nat.toText(balance));
                assert(balance > 10);
                currentChips := balance;
            };
        };
        
        var player = gameTable.getPlayer(playerAddress);
        switch(player) {
            case null {
                gameTable.createNewPlayer(playerAddress);
                gameTable.setCurrentChips(playerAddress, currentChips);
            };
            case(?player) { 
                return
            };
        };
        
        // 첫 번째 player면 방장 시켜 줌
        if (players.size() == 1) {
            setMasterPlayer(?playerAddress);
        };
        
        // player 순서 설정
        gameTable.setPlayerOrder(playerAddress, players.size()-1);

        var randomNumber :?Nat = await Utils.generateRandomNumberForPlayer();
        switch (randomNumber) {
            case null {
                gameTable.setPlayerCryptoNumber(playerAddress, 12345);
            };
            case (?randomNumber) {
                gameTable.setPlayerCryptoNumber(playerAddress, randomNumber);
            };
        };
        

        
        gameTable.updatePlayingStatus();
    };

    public func readyGame(playerAddress : Principal) {
        let player = gameTable.getPlayer(playerAddress);
        switch (player) {
            case null return;
            case (?player) {assert(player.currentChips > 10);};
        };
        gameTable.setPlayerPlayingState(playerAddress, #READY);
        gameTable.updatePlayingStatus();
    };

     public func cancelReadyGame(playerAddress : Principal) {
        gameTable.setPlayerPlayingState(playerAddress, #ENTER);
        gameTable.updatePlayingStatus();
    };

    public func exitGame(playerAddress : Principal) {
        let players = gameTable.getPlayers();
        if (players.size() == 1) {
            gameTable.removePlayer(playerAddress);
            gameStatus.masterPlayer := null;
        }; 

        let exitPlayer = gameTable.getPlayer(playerAddress);
        switch (exitPlayer) {
            case null return;
            case (?exitPlayer) {
                for (player in players.vals()) {
                    // masterPlayer가 나가면 다음 사람 master 줘야 함
                    if (?playerAddress == gameStatus.masterPlayer and player.playerOrder == 1) {
                        gameStatus.masterPlayer := ?player.address;
                    };
                    // 순서 뒤에 player들 playerOrder 하나씩 앞으로 땡기
                    if (player.playerOrder > exitPlayer.playerOrder){
                        gameTable.setPlayerOrder(player.address, Nat.sub(player.playerOrder,1));
                    };
                };
            };
        };
        gameTable.removePlayer(playerAddress);

        gameTable.updatePlayingStatus();
    };

    // 게임 시작
    public func startGame(playerAddress : Principal) : async() {
        // masterPlayer만 startGame 가능
        assert(gameStatus.masterPlayer == ?playerAddress);
        // ALL READY 상태에서만 startGame 가능
        assert(gameStatus.playingStatus == #ALL_READY);

        await fillCardDeck(NUMBER_OF_CARDS_IN_CARD_DECK);

        // player들에게 2장의 카드를 돌림
        drawCardEveryPlayers();
        drawCardEveryPlayers();

        gameStatus.playingStatus := #PLAYING;
        var players = gameTable.getPlayers();
        for (player in players.vals()) {
            gameTable.setPlayerPlayingState(player.address, #PLAYING);
            bet(player.address);
        };
        // master player 부터 시작
        gameStatus.gameTurn := 0;
    };

    func bet(playerAddress : Principal) {
        assert(gameStatus.isAllPlayerCall == false);

        gameTable.betChips(playerAddress, 1);
    };

    public func call(playerAddress : Principal) {
        assert(gameStatus.isAllPlayerCall == false);
        if (gameTable.checkIsFold(playerAddress) == false ){
            var currentPlayer = gameTable.getPlayer(playerAddress);
            let players = gameTable.getPlayers();
            var previousTurnBetAmount = 0;
            switch (currentPlayer) {
                case null return;
                case (?currentPlayer){
                    // 현재 turn이 아니면 불가
                    assert(gameStatus.gameTurn == currentPlayer.playerOrder);
                    for (player in players.vals()) {
                        if (currentPlayer.playerOrder == 0 and player.playerOrder == Nat.sub(players.size(),1)) {
                            previousTurnBetAmount := player.currentBetAmount;
                        } else if (currentPlayer.playerOrder > 0 and player.playerOrder == Nat.sub(currentPlayer.playerOrder,1)) {
                            previousTurnBetAmount := player.currentBetAmount;
                        }
                    };
                    gameTable.betChips(playerAddress, previousTurnBetAmount);
                    currentPlayer.bettingAction := #CALL;
                    gameTable.setPlayer(playerAddress, currentPlayer);
                };
            };
        };
        gameTable.checkIsAllCall();
        gameTable.nextGameTurn(playerAddress);
    };

    public func raise(playerAddress : Principal) {
        assert(gameStatus.isAllPlayerCall == false);

        if (gameTable.checkIsFold(playerAddress) == false ){
            var currentPlayer = gameTable.getPlayer(playerAddress);
            let players = gameTable.getPlayers();
            var previousTurnBetAmount = 0;
            switch (currentPlayer) {
                case null return;
                case (?currentPlayer){
                    assert(gameStatus.gameTurn == currentPlayer.playerOrder);
                   for (player in players.vals()) {
                        if (currentPlayer.playerOrder == 0 and player.playerOrder == Nat.sub(players.size(),1)) {
                            previousTurnBetAmount := player.currentBetAmount +1;
                        } else if (currentPlayer.playerOrder > 0 and player.playerOrder == Nat.sub(currentPlayer.playerOrder,1)) {
                            previousTurnBetAmount := player.currentBetAmount +1;
                        }
                    };
                    gameTable.betChips(playerAddress, previousTurnBetAmount);
                    currentPlayer.bettingAction := #RAISE;
                    gameTable.setPlayer(playerAddress, currentPlayer);
                };
            };
        };

        gameTable.nextGameTurn(playerAddress);
    };

    public func fold(playerAddress : Principal) {
        assert(gameStatus.isAllPlayerCall == false);

        var currentPlayer = gameTable.getPlayer(playerAddress);
        let players = gameTable.getPlayers();
        var previousTurnBetAmount = 0;
        switch (currentPlayer) {
            case null return;
            case (?currentPlayer){
                assert(gameStatus.gameTurn == currentPlayer.playerOrder);
                gameTable.setBettingAction(playerAddress, #FOLD);
            };
        };

        gameTable.nextGameTurn(playerAddress);
    };

    public func getMoreCard(playerAddress : Principal) {
        assert(gameStatus.isAllPlayerCall == true);

        drawCardEveryPlayers();
        let players = gameTable.getPlayers();
        for (player in players.vals()) {
            if (player.bettingAction != #FOLD) {
                gameTable.setBettingAction(player.address, #NONE);
            };
            player.currentBetAmount := 1;
            gameTable.setPlayer(player.address, player);
        };
        gameTable.checkIsAllCall();
    };

    public func stopGame(playerAddress : Principal) {
        assert(gameStatus.isAllPlayerCall == true);

        if (gameTable.checkIsFold(playerAddress) == false ){
            var currentPlayer = gameTable.getPlayer(playerAddress);
            let players = gameTable.getPlayers();
            for (player in players.vals()) {
            gameTable.setPlayerPlayingState(player.address, #END);
            };
            switch (currentPlayer) {
                case null return;
                case (?currentPlayer){
                    // 현재 turn이 아니면 불가
                    assert(gameStatus.gameTurn == currentPlayer.playerOrder);
                    gameStatus.playingStatus := #GAME_END;
                };
            };
        }; 

        // card 모두 decrypt 하기

        let winner = getWinnerPlayer();
        gameStatus.winner := ?winner;
    };


    public func settleupGame() {
        assert(gameStatus.playingStatus == #GAME_END);

        // gameStatus 초기화
        cleanGameStatus();

        //winner player를 master player 로 배정
        gameStatus.masterPlayer := gameStatus.winner;
        gameStatus.winner := null;
        let totalBetAmount = gameTable.getTotalBetAmountInMoneybox();
        gameTable.addPokerChip(Option.unwrap(gameStatus.winner), totalBetAmount);

        // player들 정보 초기화
        gameTable.initalizePlayersInfo();
    };

    // ################################################################################
    // ############################# TEST FUNCTIONS ###################################
    // ################################################################################

    public func test_fillCardDeck() : async SharedCardDeck{
        await fillCardDeck(NUMBER_OF_CARDS_IN_CARD_DECK);

        let cardDeck = gameTable.getCardDeck();
        let sharedCardDeck = convertToSharedCardDeck(cardDeck);
        sharedCardDeck
    };

    public func test_52List() : async ?[Nat] {
        await Utils.getShuffled52NumberArray()
    };

    public func test_removeAllPlayer() {
        gameTable.removeAllPlayer();
        cleanGameStatus();
    };

    public shared ({caller}) func  test_message() {
        D.print(Principal.toText(caller));
    };

    public func test_addPokerChip(playerAddress : Principal) {
        gameTable.depositICPAddPokerChip(playerAddress, 100);
        // gameTable.getPokerChipFromExchange(playerAddress, 10);
    };
    
}