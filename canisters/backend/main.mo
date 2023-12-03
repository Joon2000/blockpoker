import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Prelude "mo:base/Prelude";
import Hash "mo:base/Hash";
import randomNumber "canister:randomNumber";
import Types "types";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Test "test";


actor {
    type Player = Types.Player;
    type MutablePlayer = Types.MutablePlayer;
    type Card = Types.Card;
    type CardDeck = Types.CardDeck;
    type MutableCardDeck = Types.MutableCardDeck;
    type MutableGameStatus = Types.MutableGameStatus;
    type GameStatus = Types.GameStatus;

    // 게임 참여 최대 인원 수 4명
    let MAX_PLAYER = 4;
    let players = HashMap.HashMap<Principal, MutablePlayer>(MAX_PLAYER, Principal.equal , Principal.hash);

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
        var isAllCall = false;
    };

    // ------------------------------------------------------------ 필요한 query 함수들
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
            isAllCall = gameStatus.isAllCall;
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

    // public query func getPlayerInfo(player : Principal) : async ?Player {
    //     players.get(player)
    // };

    public query func getPlayerInfoList() : async List.List<Player> {
        var playerInfoList : List.List<Player> = List.nil<Player>();
        for (val in players.vals()) {
            let playerInfo : Player = {
                address = val.address;
                isReady = val.isReady;
                cards = val.cards;
                totalCardNumber = val.totalCardNumber;
                // currentChips = pokerChips;
                currentChips = val.currentChips;
                totalBettingChips = val.totalBettingChips;
                currentBettingChips = val.currentBettingChips;
                bettingChoice = val.bettingChoice;
                // totalChips = 0;
            };

            playerInfoList := List.push<Player>(playerInfo, playerInfoList);
        };
        
        playerInfoList
    };

    // ------------------------------------------------------------ Exchange Chips
    public func exchangePokerChips(playerAddress : Principal, amount : Nat) {
        // ICP -> Chip으로 변경하는 로직
        let player = players.get(playerAddress);
        switch (player) {
            case null return;
            case (?actualPlayer){
                actualPlayer.currentChips := actualPlayer.currentChips + amount;
                players.put(playerAddress, actualPlayer);
            }
        }
    };

    // ------------------------------------------------------------ Ready Game

    // // 게임 준비
    // // player가 실행
    // // FE에서 playerReady -> readyGame으로 변경해줘야 함
    public func readyGame(playerAddress : Principal) {
        // 참여한 player 수가 최대 player 넘어가면 에러 발생하고 player 추가 하지 않음
        assert(players.size() < MAX_PLAYER);

        // Chip이 몇 개 이상 있는지 확인을 하는 코드. 몇 개 이상 칩이 없으면 참여 못 합.
        // let pokerChips = getPokerChipInfo(playerAddress);
        // assert(pokerChips < 10);

        // 첫 번째 player면 방장 시켜 줌
        if (players.size() == 0) {
            setMasterPlayer(?playerAddress);
        };

        // player가 가지고 있는 pockerChip token개수를 불러와서 집어넣음
        
        let newPlayerInfo : MutablePlayer = {
            var address = playerAddress;
            var isReady = true;
            var cards = List.nil<Card>();
            var totalCardNumber = 0;
            // currentChips = pokerChips;
            var currentChips = 0;
            var totalBettingChips = 0;
            var currentBettingChips = 0;
            var bettingChoice = #NONE;
            // totalChips = 0;
        };

        // 일단 무조건 100개 주는 걸로 -> 나중에 시간이 되면 poker 토큰 만들기
        exchangePokerChips(playerAddress, 100);

        players.put(playerAddress, newPlayerInfo);
        setAnte(playerAddress);

        updatePlayingStatus();
    };

    func getPokerChipInfo() : async Nat{
        0
    };

    func setAnte(playerAddress : Principal) {
        sendChipsToMoneyBox(playerAddress, 0);
    };

    func sendChipsToMoneyBox(playerAddress : Principal, amount : Nat) {
        let player = players.get(playerAddress);
        switch (player) {
            case null return;
            case (?actualPlayer){
                actualPlayer.currentChips := actualPlayer.currentChips - amount;
                gameStatus.totalBettingAmount := gameStatus.totalBettingAmount + amount;
                players.put(playerAddress, actualPlayer);
            }
        }

    };

    func setMasterPlayer(player : ?Principal) {
        gameStatus.masterPlayer := player;
    };

    func updatePlayingStatus() {
        // 혼자 레디인 상태면 ALL_READY가 아님
        if (players.size() == 1) {
            gameStatus.playStatus := #NOT_READY;
            return
        };

        for (val in players.vals()) {
            if (val.isReady == false){
                gameStatus.playStatus := #NOT_READY;
                return
            }
        };
        gameStatus.playStatus := #ALL_READY;
    };

    // ------------------------------------------------------------ Exit Game
    // 게임 나가기
    public func exitGame(playerAddress : Principal) {
        if (players.size() > 1 and ?playerAddress == gameStatus.masterPlayer) {
            // masterPlayer가 나가면 다음 사람 master 줘야 함
        };
        removePlayer(playerAddress);
        updatePlayingStatus();
    };

    func removePlayer(playerAddress : Principal) {
        players.delete(playerAddress);
    };

    // ------------------------------------------------------------ Start Game
    // 게임 시작
    public func startGame(playerAddress : Principal) {
        // masterPlayer만 startGame 가능
        assert(gameStatus.masterPlayer == ?playerAddress);
        await fillCardDeck(NUMBER_OF_CARDS_IN_CARD_DECK);
        drawCard(playerAddress);


        gameStatus.playStatus := #PLAYING;
    };

    func fillCardDeck(numberOfCards : Nat) : async() {
        for (i in Iter.range(0, numberOfCards)) {
            let card : Card = await getEncryptedCard(i);
            cardDeck.cards := List.push<Card>(card, cardDeck.cards);
            cardDeck.currentNumberOfCards := cardDeck.currentNumberOfCards + 1;
        }
    };

    func getEncryptedCard(order : Nat) : async Card {
        let cardNumber = Option.get((await randomNumber.generateRandomNumber(),0));
        // encryptedCardNumber = getEncryptedCardNumber(cardNumber);
        let card : Card = {
                cardNumber = cardNumber;
                // cardNumber = encryptedCardNumber;
                order = order;
        };
        card
    };

    public func test_getEncryptedCard(order : Nat, cardNumber : Nat) : async List.List<Card> {
        await Test.test_getEncryptedCard(order, cardNumber);
    };

    func getEncryptedCardNumber(cardNumber : Nat) : async Hash.Hash {
        // 암호화해야한다.
        // 임시용
        Hash.hash(cardNumber)
    };

    func draw2CardsToPlayers() {
        // 플레이어마다 카드를 2 장씩 나눠준다. 
        
    };

    func drawCard(playerAddress : Principal) {
        let card = List.pop<Card>(cardDeck.cards);
        // var player = players.get(playerAddress);
        // switch (player) {
        //     case null return;
        //     case (?actualPlayer) {
        //         // 
        //         // let cards = List.push<List.List<Card>>(card, actualPlayer.cards);
        //     }
        // }
    };

    public func test_drawCard() : async ?Card{
        let (card, cardList) = List.pop<Card>(cardDeck.cards);
        // var player = players.get(playerAddress);
        // switch (player) {
        //     case null return;
        //     case (?actualPlayer) {
        //         // 
        //         // let cards = List.push<List.List<Card>>(card, actualPlayer.cards);
        //     }
        // }
        // let c = cardAndCardDeck.1;
        
        // let cd : CardDeck = {
        //     cards = cardDeck.cards;
        //     currentNumberOfCards = cardDeck.currentNumberOfCards;
        //     numberOfUsedCards = cardDeck.numberOfUsedCards;
        // }
        cardDeck.cards := cardList;

        card
    };


    func setPlayerTurn(playerAddress : ?Principal) {
        gameStatus.whoseTurn := playerAddress;
    };


    // ------------------------------------------------------------ End Game
    public func endGame() {

    };

    func initalizeGame(){

    };

}