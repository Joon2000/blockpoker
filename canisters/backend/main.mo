import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Prelude "mo:base/Prelude";
import Hash "mo:base/Hash";
import randomNumber "canister:randomNumber";


actor {
    type Choice = { #FOLD; #CHECK; #RAISE; #CALL; #NONE;};
    type Player = {
        address : Principal;
        isReady : Bool;
        cards : List.List<Card>;
        totalBettingAmount : Nat;
        currentBettingAmount : Nat;
        bettingChoice : Choice;
    };

    type Card = {
        cardNumber : Nat;
        order : Nat;
    };

    type CardDeck = {
        cards : List.List<Card>;
        currentNumberOfCards : Nat;
        numberOfUsedCards : Nat;
    };

    type MutableCardDeck = {
        var cards : List.List<Card>;
        var currentNumberOfCards : Nat;
        var numberOfUsedCards : Nat;
    };

    type PlayStatus = { #NOT_READY; #ALL_READY; #PLAYING; #GAME_END };

    // query용 immutable type
    type GameStatus = {
        playStatus : PlayStatus;
        totalBettingAmount : Nat;
        whoseTurn : ?Principal;
        masterPlayer : ?Principal;
        cardDeck : CardDeck;
    };

    type MutableGameStatus = {
        var playStatus : PlayStatus;
        var totalBettingAmount : Nat;
        var whoseTurn : ?Principal;
        var masterPlayer : ?Principal;
        var cardDeck : MutableCardDeck;
    };

    // 게임 참여 최대 인원 수 4명
    let MAX_PLAYER = 4;
    let players = HashMap.HashMap<Principal, Player>(MAX_PLAYER, Principal.equal , Principal.hash);

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
    };

    // 필요한 query 함수들
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

    public query func getPlayerInfo(player : Principal) : async ?Player {
        players.get(player)
    };

    public query func getPlayerInfoList() : async List.List<Player> {
        var playerInfoList : List.List<Player> = List.nil<Player>();
        for (val in players.vals()) {
            playerInfoList := List.push<Player>(val, playerInfoList);
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
        
        let newPlayerInfo : Player = {
            address = player;
            isReady = true;
            cards = List.nil<Card>();
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

    func fillCardDeck(cardDeck : MutableCardDeck, numberOfCards : Nat) {
        for (i in Iter.range(0, numberOfCards)) {
            // let card : Card = await getEncryptedCard(i);
            // 임시
            let card : Card = {
                cardNumber = i;
                order = i;
            };

            cardDeck.cards := List.push<Card>(card, cardDeck.cards);
        }
    };

    func getEncryptedCard(order : Nat) : async Card {
        // cardNumber = await randomNumber.generateRandomNumber();
        // encryptedCardNumber = getEncryptedCardNumber(cardNumber);
        let card : Card = {
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

    func drawCard(cardDeck : MutableCardDeck) {
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