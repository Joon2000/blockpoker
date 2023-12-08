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
import Stack "mo:base/Stack";


actor {
    type Player = Types.Player;
    type SharedPlayer = Types.SharedPlayer;
    type PlayerSeats = Types.PlayerSeats;
    type Card = Types.Card;
    type CardDeck = Types.CardDeck;
    type MoneyBox = Types.MoneyBox;
    type GameStatus = Types.GameStatus;
    type SharedGameStatus = Types.SharedGameStatus;
    type BettingAction = Types.BettingAction;

    // 게임 참여 최대 인원 수 4명
    let MAX_PLAYER = 4;
    // let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 52;
    let NUMBER_OF_CARDS_IN_CARD_DECK : Nat = 10;

    
    var gameStatus : GameStatus = {
        var playingStatus = #NOT_ALL_READY;
        var masterPlayer = null;
        var whoseTurn = null;
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

        public func getPlayerInfo(playerAddress : Principal) : ?Player {
            var player : ?Player = players.get(playerAddress);
            player
        };

        public func getPlayerInfoList() : List.List<Player> {
            var playerInfoList : List.List<Player> = List.nil<Player>();
            for (playerInfo in players.vals()) {
                playerInfoList := List.push<Player>(playerInfo, playerInfoList);
            };
            playerInfoList
        };

        public func updatePlayerInfo(playerAddress : Principal, player : Player) {
            players.put(playerAddress, player);
        };

        public func setPlayerIsReady(playerAddress : Principal, isReady : Bool) {
            var player : ?Player = players.get(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.isReady := isReady;
                    updatePlayerInfo(playerAddress, player);
                };
            };
        };

        // 여기에 encrypt card, decrypt card 가 필요하긴 함.....
        public func drawCardToPlayer(playerAddress : Principal) {
           var player : ?Player = players.get(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    let (card, cards) = List.pop<Card>(cardDeck.cards);
                    cardDeck.cards := cards;
                    cardDeck.numberOfCards -= 1;
                    switch (card) {
                        case null return;
                        case (?card) {
                            player.cards := List.push(card, player.cards);
                            updatePlayerInfo(playerAddress, player);
                        };
                    };
                };
            }; 
        };

        public func cleanPlayerCards(playerAddress : Principal) {
            var player : ?Player = players.get(playerAddress);
            var usedCards = List.nil<Card>();
            switch (player){
                case null return;
                case (?player) {
                    usedCards := player.cards;
                    player.cards := List.nil<Card>();
                    player.totalCardNumber := 0;
                    updatePlayerInfo(playerAddress, player);

                    usedCardDeck.cards := List.append<Card>(usedCards, usedCardDeck.cards);
                    usedCardDeck.numberOfCards -= List.size<Card>(usedCards);
                };
            }; 
            
        };

        public func setBetAmount(playerAddress : Principal, betAmount : Nat) {
            var player : ?Player = players.get(playerAddress);
            switch (player){
                case null return;
                case (?player) {
                    player.betAmount := betAmount;
                    player.totalBetAmount -= betAmount;
                    player.currentChips += betAmount;
                    updatePlayerInfo(playerAddress, player);

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
                    updatePlayerInfo(playerAddress, player);
                };
            };  
        };

    };




















    // ------------------------------------------------------------ 필요한 query 함수들
    // public query func getGameStatus() : async GameStatus {
    //     let _gameStatus : GameStatus = {
    //         playingStatus = gameStatus.playingStatus;
    //         masterPlayer = gameStatus.masterPlayer;
    //         whoseTurn = gameStatus.whoseTurn;
    //         // cardDeck = gameStatus.cardDeck;
    //         moneyBox = gameStatus.moneyBox;
    //         isAllCall = gameStatus.isAllCall;
    //     };

    //     _gameStatus
    // };


    // public query func getPlayerList() : async List.List<Principal> {
    //     var playerList : List.List<Principal> = List.nil<Principal>();
    //     for (key in playerSeats.keys()) {
    //         playerList := List.push<Principal>(key, playerList);
    //     };

    //     playerList
    // };

    // public query func getPlayerInfo(player : Principal) : async ?Player {
    //     playerSeats.get(player)
    // };

    // func getMutable(address: Principal) : Player {
    //     let updatedPlayer : Player = {
    //         var address = address;
    //         var isReady = true;
    //         var cards = List.nil<Card>();
    //         // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
    //         var totalCardNumber = 0;
    //         var currentChips = 0;
    //         var totalBettingChips = 0;
    //         var currentBettingChips = 0;
    //         var bettingAction = #NONE;
    //     };
    //     return updatedPlayer;
    // };

    // public query func getPlayerInfoList() : async List.List<Player> {
    //     var playerInfoList : List.List<Player> = List.nil<Player>();
    //     for (val in playerSeats.vals()) {
    //         let playerInfo : Player = {
    //             address = val.address;
    //             isReady = val.isReady;
    //             cards = val.cards;
    //             totalCardNumber = val.totalCardNumber;
    //             currentChips = val.currentChips;
    //             totalBettingChips = val.totalBettingChips;
    //             currentBettingChips = val.currentBettingChips;
    //             bettingAction = val.bettingAction;
    //             // totalChips = 0;
    //         };

    //         playerInfoList := List.push<Player>(playerInfo, playerInfoList);
    //     };
        
    //     playerInfoList
    // };

    // ------------------------------------------------------------ Exchange Chips
    // public func exchangePokerChips(playerAddress : Principal, amount : Nat) {
    //     // ICP -> Chip으로 변경하는 로직
    //     let player = playerSeats.get(playerAddress);
    //     switch (player) {
    //         case null return;
    //         case (?player){
    //             // let address = player.address;
    //             let updatedPlayer : Player = {
    //                 address = player.address;
    //                 isReady = player.isReady;
    //                 cards = player.cards;
    //                 // TODO : card number가 아니라 card combination이 뭔지로 바꿔야 함 나중에는
    //                 totalCardNumber = player.totalCardNumber;
    //                 currentChips = player.currentChips + amount;
    //                 totalBettingChips = player.totalBettingChips;
    //                 currentBettingChips = player.currentBettingChips;
    //                 bettingAction = player.bettingAction;

    //             };
                
    //             // player.currentChips := player.currentChips + amount;
    //             playerSeats.put(playerAddress, updatedPlayer);
    //         }
    //     }
    // };

    // ------------------------------------------------------------ Ready Game

    // // 게임 준비
    // // player가 실행
    // // FE에서 playerReady -> readyGame으로 변경해줘야 함
    // public func readyGame(playerAddress : Principal) {
    //     // 참여한 player 수가 최대 player 넘어가면 에러 발생하고 player 추가 하지 않음
    //     assert(playerSeats.size() < MAX_PLAYER);

    //     // Chip이 몇 개 이상 있는지 확인을 하는 코드. 몇 개 이상 칩이 없으면 참여 못 합.
    //     // let pokerChips = getPokerChipInfo(playerAddress);
    //     // assert(pokerChips < 10);

    //     // 첫 번째 player면 방장 시켜 줌
    //     if (playerSeats.size() == 0) {
    //         setMasterPlayer(?playerAddress);
    //     };

    //     // player가 가지고 있는 pockerChip token개수를 불러와서 집어넣음
        
    //     // let newPlayerInfo : MutablePlayer = {
    //     let newPlayerInfo : Player = {
    //         address = playerAddress;
    //         isReady = true;
    //         cards = List.nil<Card>();
    //         totalCardNumber = 0;
    //         // currentChips = pokerChips;
    //         currentChips = 0;
    //         totalBettingChips = 0;
    //         currentBettingChips = 0;
    //         bettingAction = #NONE;
    //         // totalChips = 0;
    //     };

    //     // 일단 무조건 100개 주는 걸로 -> 나중에 시간이 되면 poker 토큰 만들기
    //     exchangePokerChips(playerAddress, 100);

    //     playerSeats.put(playerAddress, newPlayerInfo);
    //     setAnte(playerAddress);

    //     updatePlayingStatus();
    // };

    func getPokerChipInfo() : async Nat{
        0
    };

    // func setAnte(playerAddress : Principal) {
    //     sendChipsToMoneyBox(playerAddress, 0);
    // };

    // func sendChipsToMoneyBox(playerAddress : Principal, amount : Nat) {
    //     let player = playerSeats.get(playerAddress);
    //     switch (player) {
    //         case null return;
    //         case (?actualPlayer){
    //             // actualPlayer.currentChips := actualPlayer.currentChips - amount;
    //             gameStatus.moneyBox := gameStatus.moneyBox+ amount;
    //             playerSeats.put(playerAddress, actualPlayer);
    //         }
    //     }

    // };

    func setMasterPlayer(player : ?Principal) {
        gameStatus.masterPlayer := player;
    };

    // func updatePlayingStatus() {
    //     // 혼자 레디인 상태면 ALL_READY가 아님
    //     if (playerSeats.size() == 1) {
    //         gameStatus.playingStatus := #NOT_ALL_READY;
    //         return
    //     };

    //     for (val in playerSeats.vals()) {
    //         if (val.isReady == false){
    //             gameStatus.playingStatus := #NOT_ALL_READY;
    //             return
    //         }
    //     };
    //     gameStatus.playingStatus := #ALL_READY;
    // };

    // ------------------------------------------------------------ Exit Game
    // 게임 나가기
    // public func exitGame(playerAddress : Principal) {
    //     if (playerSeats.size() > 1 and ?playerAddress == gameStatus.masterPlayer) {
    //         // masterPlayer가 나가면 다음 사람 master 줘야 함
    //     };
    //     removePlayer(playerAddress);
    //     updatePlayingStatus();
    // };

    // func removePlayer(playerAddress : Principal) {
    //     playerSeats.delete(playerAddress);
    // };

    // ------------------------------------------------------------ Start Game
    // 게임 시작
    // public func startGame(playerAddress : Principal) {
    //     // masterPlayer만 startGame 가능
    //     assert(gameStatus.masterPlayer == ?playerAddress);
    //     await fillCardDeck(NUMBER_OF_CARDS_IN_CARD_DECK);
    //     drawCard(playerAddress);


    //     gameStatus.playingStatus := #PLAYING;
    // };

    // func fillCardDeck(numberOfCards : Nat) : async() {
    //     for (i in Iter.range(0, numberOfCards)) {
    //         let card : Card = await getEncryptedCard(i);
    //         cardDeck := List.push<Card>(card, cardDeck);
    //         // cardDeck.currentNumberOfCards := cardDeck.currentNumberOfCards + 1;
    //     }
    // };

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

    // func drawCard(playerAddress : Principal) {
    //     let card = List.pop<Card>(cardDeck);
    //     // var player = playerSeats.get(playerAddress);
    //     // switch (player) {
    //     //     case null return;
    //     //     case (?actualPlayer) {
    //     //         // 
    //     //         // let cards = List.push<List.List<Card>>(card, actualPlayer.cards);
    //     //     }
    //     // }
    // };

    // public func test_drawCard() : async ?Card{
    //     let (card, cardList) = List.pop<Card>(cardDeck);
    //     // var player = playerSeats.get(playerAddress);
    //     // switch (player) {
    //     //     case null return;
    //     //     case (?actualPlayer) {
    //     //         // 
    //     //         // let cards = List.push<List.List<Card>>(card, actualPlayer.cards);
    //     //     }
    //     // }
    //     // let c = cardAndCardDeck.1;
        
    //     // let cd : CardDeck = {
    //     //     cards = cardDeck.cards;
    //     //     currentNumberOfCards = cardDeck.currentNumberOfCards;
    //     //     numberOfUsedCards = cardDeck.numberOfUsedCards;
    //     // }
    //     cardDeck := cardList;

    //     card
    // };


    func setPlayerTurn(playerAddress : ?Principal) {
        gameStatus.whoseTurn := playerAddress;
    };


    // ------------------------------------------------------------ End Game
    public func endGame() {

    };

    func initalizeGame(){

    };

}