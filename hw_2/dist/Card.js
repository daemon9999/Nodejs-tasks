import { isCurrency } from "./CurrencyEnum.js";
import Transaction from "./Transaction.js";
class Card {
    constructor() {
        this.transactions = [];
    }
    addTransaction(arg1, arg2) {
        let transaction;
        if (arg2 && isCurrency(arg1)) {
            transaction = new Transaction(arg2, arg1);
        }
        else if (arg1 instanceof Transaction) {
            transaction = arg1;
        }
        else {
            transaction = null;
        }
        if (transaction instanceof Transaction)
            this.transactions.push(transaction);
        return transaction?.id;
    }
    getTransaction(id) {
        const transactionFound = this.transactions.find((transaction) => transaction.id === id);
        return transactionFound;
    }
    getBalance(currency) {
        let totalMoney = 0;
        this.transactions.map((transaction) => {
            if (transaction.currency === currency) {
                totalMoney += transaction.amount;
            }
        });
        return totalMoney;
    }
}
export default Card;
