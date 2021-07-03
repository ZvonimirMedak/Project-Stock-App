export const priceFormater = (price: number) =>
  new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
