import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Prelude "mo:base/Prelude";
import Hash "mo:base/Hash";
import randomNumber "canister:randomNumber";
import Types "types";


actor {
    // 게임 참여 최대 인원 수 4명
    let MAX_PLAYER = 4;
    let players = HashMap.HashMap<Principal, Types.Player>(MAX_PLAYER, Principal.equal , Principal.hash);

    // let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 52;
    let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 10;

    var cardDeck : Types.MutableCardDeck = {
        var cards = List.nil<Types.Card>();
        var currentNumberOfCards = 0;
        var numberOfUsedCards = 0;
    };

    var usedCardDeck : Types.MutableCardDeck = {
        var cards = List.nil<Types.Card>();
        var currentNumberOfCards = 0;
        var numberOfUsedCards = 0;
    };

    var gameStatus : Types.MutableGameStatus = {
        var playStatus = #NOT_READY;
        var totalBettingAmount = 0;
        var whoseTurn = null;
        var masterPlayer = null;
        var cardDeck = cardDeck;
    };

    // 필요한 query 함수들
    public query func getGameStatus() : async Types.GameStatus {
        let immuCardDeck : Types.CardDeck = {
            cards = cardDeck.cards;
            currentNumberOfCards = cardDeck.currentNumberOfCards;
            numberOfUsedCards = cardDeck.numberOfUsedCards;  
        };

        let _gameStatus : Types.GameStatus = {
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

    public query func getPlayerInfo(player : Principal) : async ?Types.Player {
        players.get(player)
    };

    public query func getPlayerInfoList() : async List.List<Types.Player> {
        var playerInfoList : List.List<Types.Player> = List.nil<Types.Player>();
        for (val in players.vals()) {
            playerInfoList := List.push<Types.Player>(val, playerInfoList);
        };
        
        playerInfoList
    };

    // 게임 준비
    public func readyGame(player : Principal) {
        // 참여한 player 수가 최대 player 넘어가면 에러 발생하고 player 추가 하지 않음
        assert(players.size() < MAX_PLAYER);

        // 첫 번째 player면 방장 시켜 줌
        if (players.size() == 0) {
            setMasterPlayer(?player);
        };
        
        let newPlayerInfo : Types.Player = {
            address = player;
            isReady = true;
            cards = List.nil<Types.Card>();
            totalCardNumber = 0;
            totalBettingAmount = 0;
            currentBettingAmount = 0;
            bettingChoice = #NONE;
        };
        players.put(player, newPlayerInfo);

        updatePlayingStatus();
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

    func setMasterPlayer(player : ?Principal) {
        gameStatus.masterPlayer := player;
    };

    // 게임 시작
    public func startGame(player : Principal) {
        // masterPlayer만 startGame 가능
        assert(gameStatus.masterPlayer == ?player);
        fillCardDeck(cardDeck, NUMBER_OF_CARDS_IN_CARD_DECK);
        drawCard(cardDeck);

        gameStatus.playStatus := #PLAYING;
    };

    func fillCardDeck(cardDeck : Types.MutableCardDeck, numberOfCards : Nat) {
        for (i in Iter.range(0, numberOfCards)) {
            // let card : Card = await getEncryptedCard(i);
            // 임시
            let card : Types.Card = {
                cardNumber = i;
                order = i;
            };

            cardDeck.cards := List.push<Types.Card>(card, cardDeck.cards);
        }
    };

    func getEncryptedCard(order : Nat) : async Types.Card {
        // cardNumber = await randomNumber.generateRandomNumber();
        // encryptedCardNumber = getEncryptedCardNumber(cardNumber);
        let card : Types.Card = {
                cardNumber = order;
                // cardNumber = encryptedCardNumber;
                order = order;
        };
        card
    };

    func getEncryptedCardNumber(cardNumber : Nat) : async Hash.Hash {
        // 암호화해야한다.
        // 임시용
        Hash.hash(cardNumber)
    };

    func drawCard(cardDeck : Types.MutableCardDeck) {
        // 플레이어들에게 카드를 2 장씩 나눠준다.

    };

    // func


    // 게임 나가기
    public func exitGame(player : Principal) {
        if (players.size() > 1 and ?player == gameStatus.masterPlayer) {
            // 다음 사람 줘야 함
        };
        removePlayer(player);
        updatePlayingStatus();
    };

    func removePlayer(player : Principal) {
        players.delete(player);
    };

}