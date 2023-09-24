import Card from "./Card.js"
import CurrencyEnum from "./CurrencyEnum.js"
import Transaction from "./Transaction.js"

const divider = '-------------------------------------------------'
const personalCard: Card = new Card()
console.log("Personal card was created successfully!\n", divider)

const newTransaction: Transaction = new Transaction(400, CurrencyEnum.USD)
console.log("You are doing transaction process of 400 USD!")
personalCard.addTransaction(newTransaction)
console.log("This transaction was done successfully (card)!\n",divider )


personalCard.addTransaction(CurrencyEnum.UAH, 600)
console.log("The transaction process of 600 UAH was done successfully (card)!\n", divider)


const firstTransaction = personalCard.getTransaction(newTransaction.id)

console.log(`
Your first transaction details:
ID: ${firstTransaction?.id}
CURRENCY: ${firstTransaction?.currency}
AMOUNT: ${firstTransaction?.amount}
\n`, divider)


const totalUAH = personalCard.getBalance(CurrencyEnum.UAH)
const totalUSD = personalCard.getBalance(CurrencyEnum.USD)

console.log(`
Total balance in UAH Currency: ${totalUAH}
Total balance in USD Currency: ${totalUSD}
`)

