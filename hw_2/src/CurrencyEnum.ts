enum CurrencyEnum {
  USD = "USD",
  UAH = "UAH",
}

export function isCurrency(value: any): value is CurrencyEnum {
  return Object.values(CurrencyEnum).includes(value);
}

export default CurrencyEnum;
