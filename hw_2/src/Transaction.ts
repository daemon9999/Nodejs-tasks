import CurrencyEnum from "./CurrencyEnum.js"
import {v4 as generateUid} from "uuid"

class Transaction {
    readonly id: string
    readonly amount: number
    readonly currency: CurrencyEnum

 
    constructor (amount: number, currency: CurrencyEnum) {
        this.id = generateUid()
        this.amount = amount
        this.currency = currency
    }
}


export default Transaction