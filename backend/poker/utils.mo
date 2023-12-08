
import Types "types";


module Utils {
    type Player = Types.Player;
    type SharedPlayer = Types.SharedPlayer;
    type GameStatus = Types.GameStatus;
    type SharedGameStatus = Types.SharedGameStatus;

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
            whoseTurn = gameStatus.whoseTurn;
            isAllPlayerCall = gameStatus.isAllPlayerCall;
        };
        sharedGameStatus
    };

}