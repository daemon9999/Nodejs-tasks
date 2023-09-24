import CurrencyEnum, { isCurrency } from "./CurrencyEnum.js";
import Transaction from "./Transaction.js";

class Card {
  readonly transactions: Transaction[] = [];

  addTransaction(transaction: Transaction): string;

  addTransaction(currency: CurrencyEnum, amount: number): string;

  addTransaction(
    arg1: CurrencyEnum | Transaction,
    arg2?: number
  ): string | undefined {
    let transaction: Transaction | null;
    if (arg2 && isCurrency(arg1)) {
      transaction = new Transaction(arg2, arg1);
    } else if (arg1 instanceof Transaction) {
      transaction = arg1;
    } else {
      transaction = null;
    }

    if (transaction instanceof Transaction) this.transactions.push(transaction);
    return transaction?.id;
  }

  getTransaction(id: string): Transaction | undefined {
    const transactionFound: Transaction | undefined = this.transactions.find(
      (transaction) => transaction.id === id
    );
    return transactionFound;
  }

  getBalance(currency: CurrencyEnum): number {
    let totalMoney: number = 0;
    this.transactions.map((transaction) => {
      if (transaction.currency === currency) {
        totalMoney += transaction.amount;
      }
    });

    return totalMoney;
  }
}


export default Card