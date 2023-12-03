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

    
}