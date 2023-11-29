import randomNumber "canister:randomNumber";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";


actor {
    let principals = Array.init<Text>(2,"");
    let player1cards = Array.init<?Nat>(2,?0);
    let player2cards = Array.init<?Nat>(2,?0);

    public func initializeCards(): async ?(){
        do ? {
        player1cards[0]:= await randomNumber.generateRandomNumber();
        player1cards[1]:= await randomNumber.generateRandomNumber();
        player2cards[0]:= await randomNumber.generateRandomNumber();
        player1cards[1]:= await randomNumber.generateRandomNumber();
        };
    };

    public func playerReady(principal: Text): async Text{
        if(principals[0]==""){
            principals[0]:=principal;
            return "PLAYER1";
        } else {
            principals[1]:=principal;
            let result = await initializeCards();
            return "PLAYER2";
        };
    } ;

    public query func checkCards(): async ?Nat{
        return player1cards[0]
    } 

}