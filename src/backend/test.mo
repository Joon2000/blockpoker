import List "mo:base/List";
import Types "types";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import randomNumber "canister:randomNumber";


module {
    type Card =Types.Card;

    public func test_getEncryptedCard(order : Nat, cardNumber : Nat) : async List.List<Card> {
        let emptyCard : Card = {
            cardNumber = 0;
            order = 0;
        };
        var cardList = List.nil<Card>();
        for (i in Iter.range(0, cardNumber)) {
            let cardNumber = Option.get((await randomNumber.generateRandomNumber(),0));
            // encryptedCardNumber = getEncryptedCardNumber(cardNumber);
            let card : Card = {
                    cardNumber = cardNumber;
                    // cardNumber = encryptedCardNumber;
                    order = order;
            };

            cardList := List.push<Card>(card, cardList);
        
        };
        cardList
    };
}
 