import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
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
    type GameTable = Types.GameTable;
    type GameStatus = Types.GameStatus;
    type SharedGameStatus = Types.SharedGameStatus;
    type BettingAction = Types.BettingAction;

    // 게임 참여 최대 인원 수 4명
    let MAX_PLAYER = 4;

    let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 52;
    // let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 20;
    
    var gameStatus : GameStatus = {
        var playingStatus = #NOT_ALL_READY;
        var masterPlayer = null;
        var gameTurn = null;
        var isAllPlayerCall = false;
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

        // #######################################################
        // ################ GameTable Methods ####################
        // ################### Get Methods #######################
        public func getPlayer(playerAddress : Principal) : ?Player {
            var player : ?Player = players.get(playerAddress);
            player
        };

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

        public func setPlayer(playerAddress : Principal, player : ?Player) {
            let player : ?Player = players.get(playerAddress);
            switch (player) {
                case null setNewPlayer(playerAddress);
                case (?player) {
                    players.put(playerAddress, player);
                };
            };
        };

        func setNewPlayer(playerAddress : Principal) {
            let newPlayer = getNewPlayer(playerAddress);
            players.put(playerAddress, newPlayer);
        };
        
        public func removePlayer(playerAddress : Principal) {
            players.delete(playerAddress);
        };

        public func setPlayerIsReady(playerAddress : Principal, isReady : Bool) {
            var player : ?Player = getPlayer(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.isReady := isReady;
                    setPlayer(playerAddress, ?player);
                };
            };
        };

        public func updatePlayingStatus() {
            // 혼자 레디인 상태면 ALL_READY가 아님
            if (players.size() <= 1) {
                gameStatus.playingStatus := #NOT_ALL_READY;
                return
            };

            for (player in players.vals()) {
                if (player.isReady == false){
                    gameStatus.playingStatus := #NOT_ALL_READY;
                    return
                };
            };

            D.print("below for loop");
            
            gameStatus.playingStatus := #ALL_READY;
        }; 

        public func setCardDeck(newCardDeck : CardDeck) {
            cardDeck := newCardDeck;
        };

        public func addCardIntoPlayer(playerAddress : Principal, card : Card) {
            var player : ?Player = getPlayer(playerAddress);
            switch (player) {
                case null return;
                case (?player) {
                    player.cards := List.push(card, player.cards);
                    setPlayer(playerAddress, ?player)
                };
            };
        };

        public func addCardIntoDeck(card : Card) {
            let cards = List.push<Card>(card, cardDeck.cards);
            cardDeck.cards := cards;
            cardDeck.numberOfCards += 1;
        };

        public func drawCardFromDeck() : ?Card {
            let (card, cards) = List.pop<Card>(cardDeck.cards);
            cardDeck.cards := cards;
            cardDeck.numberOfCards -= 1;
            card
        };

        public func cleanPlayerCards(playerAddress : Principal) {
            var player : ?Player = getPlayer(playerAddress);
            var usedPlayerCards : List.List<Card> = List.nil<Card>();
            switch (player){
                case null return;
                case (?player) {
                    usedPlayerCards := player.cards;
                    player.cards := List.nil<Card>();
                    player.totalCardNumber := 0;
                    setPlayer(playerAddress, ?player);

                    usedCardDeck.cards := List.append<Card>(usedPlayerCards, usedCardDeck.cards);
                    usedCardDeck.numberOfCards += List.size<Card>(usedPlayerCards);
                };
            }; 
        };

        public func setBetAmount(playerAddress : Principal, betAmount : Nat) {
            var player : ?Player = getPlayer(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.betAmount := betAmount;
                    player.currentChips -= betAmount;
                    player.totalBetAmount += betAmount;
                    setPlayer(playerAddress, ?player);

                    moneyBox.totalBetAmount += betAmount;
                };
            }; 
        };

        public func setBettingAction(playerAddress : Principal, bettingAction : BettingAction) {
           var player : ?Player = players.get(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.bettingAction := bettingAction;
                    setPlayer(playerAddress, ?player);
                };
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

    func exchangePokerChips(playerAddress : Principal, amount : Nat) {
        Utils.exchangePokerChips(gameTable, playerAddress, amount);  
    };

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
        Utils.drawCardToPlayer(gameTable, playerAddress);
    };

    func drawCardEveryPlayers() {
        Utils.drawCardEveryPlayers(gameTable);
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

    public query func getCardDeck() : async SharedCardDeck {
        let cardDeck = gameTable.getCardDeck();
        let sharedCardDeck = convertToSharedCardDeck(cardDeck);
        sharedCardDeck
    };

    // ################################################################################
    // ########################### UPDATE FUNCTIONS ###################################
    // ################################################################################

    // connect wallet 또는 identity 로그인 시 실행
    public func enterGame(playerAddress : Principal) {
        // 참여한 player 수가 최대 player 넘어가면 에러 발생하고 player 추가 하지 않음
        let players = gameTable.getPlayers();
        assert(players.size() < MAX_PLAYER);

        // 첫 번째 player면 방장 시켜 줌
        if (players.size() == 0) {
            setMasterPlayer(?playerAddress);
        };

        // 기존에 있던 player의 chip 불러오는 코드
        gameTable.setPlayer(playerAddress, null);
        gameTable.updatePlayingStatus();
    };

    public func readyGame(playerAddress : Principal) {
        // 참여한 player 수가 최대 player 넘어가면 에러 발생하고 player 추가 하지 않음
        let players = gameTable.getPlayers();
        assert(players.size() < MAX_PLAYER);

        // 일단 무조건 100개 주는 걸로 -> 나중에 시간이 되면 poker 토큰 만들기
        exchangePokerChips(playerAddress, 100);
        // Chip이 몇 개 이상 있는지 확인을 하는 코드. 몇 개 이상 칩이 없으면 참여 못 합.
        let player = gameTable.getPlayer(playerAddress);
        switch (player) {
            case null return;
            case (?player) {assert(player.currentChips < 10);};
        };
        gameTable.setPlayerIsReady(playerAddress, true);
        gameTable.updatePlayingStatus();
    };

    public func exitGame(playerAddress : Principal) {
        let players = gameTable.getPlayers();
        if (players.size() > 1 and ?playerAddress == gameStatus.masterPlayer) {
            // masterPlayer가 나가면 다음 사람 master 줘야 함
        };
        gameTable.removePlayer(playerAddress);
        gameTable.updatePlayingStatus();
    };

    // 게임 시작
    public func startGame(playerAddress : Principal) : async() {
        // masterPlayer만 startGame 가능
        assert(gameStatus.masterPlayer == ?playerAddress);

        await fillCardDeck(NUMBER_OF_CARDS_IN_CARD_DECK);

        // player들에게 2장의 카드를 돌림
        drawCardEveryPlayers();
        drawCardEveryPlayers();

        gameStatus.playingStatus := #PLAYING;
        // master player 부터 시작
        gameStatus.gameTurn := gameStatus.masterPlayer;
    };

    public func endGame() {
        gameStatus.playingStatus := #NOT_ALL_READY;
        gameStatus.masterPlayer := null; //winner 로 배정
        gameStatus.gameTurn := null;
        gameStatus.isAllPlayerCall := false;

        var players = gameTable.getPlayers();
        for (player in players.vals()) {
            gameTable.setPlayerIsReady(player.address, false);
        };
    };

    public func test_fillCardDeck() : async SharedCardDeck{
        await fillCardDeck(NUMBER_OF_CARDS_IN_CARD_DECK);

        let cardDeck = gameTable.getCardDeck();
        let sharedCardDeck = convertToSharedCardDeck(cardDeck);
        sharedCardDeck
    };

}