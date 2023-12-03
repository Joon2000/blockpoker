import Types "types";
import HashMap "mo:base/HashMap";


module Utils {
    type MutablePlayer = Types.MutablePlayer;
    type MutableGameStatus = Types.MutableGameStatus;

    // public func sendChipsToMoneyBox(players : HashMap.HashMap<Principal, MutablePlayer>, gameStatus : MutableGameStatus, playerAddress : Principal, amount : Nat) {
    //     let player = players.get(playerAddress);
    //     switch (player) {
    //         case null return;
    //         case (?actualPlayer){
    //             actualPlayer.currentChips := actualPlayer.currentChips - amount;
    //             gameStatus.totalBettingAmount := gameStatus.totalBettingAmount + amount;
    //         }
    //     }

    // };

    public func updatePlayingStatus(players : HashMap.HashMap<Principal,  MutablePlayer>, gameStatus : MutableGameStatus) {
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
}