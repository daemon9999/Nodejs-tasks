import { v4 as generateUid } from "uuid";
class Transaction {
    constructor(amount, currency) {
        this.id = generateUid();
        this.amount = amount;
        this.currency = currency;
    }
}
export default Transaction;
