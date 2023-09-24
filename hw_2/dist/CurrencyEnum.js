var CurrencyEnum;
(function (CurrencyEnum) {
    CurrencyEnum["USD"] = "USD";
    CurrencyEnum["UAH"] = "UAH";
})(CurrencyEnum || (CurrencyEnum = {}));
export function isCurrency(value) {
    return Object.values(CurrencyEnum).includes(value);
}
export default CurrencyEnum;
