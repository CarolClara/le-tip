const maskMoney = function (value: string, currency: string) {
  if (value?.length > 0) {
    return Intl.NumberFormat(currency, {
      minimumFractionDigits: 2,
    }).format(parseFloat(value) / 100);
  }
  return "0.00";
};

const unmaskMoney = function (value: string) {
  if (value?.length > 0) {
    return value
      .toLocaleString()
      .replaceAll(".", "")
      .replace(",", "")
      .replace(/[^0-9,.]/g, "");
  }
};

const rawValue = (value: string) => parseFloat(value.replaceAll(",", ""));

export { maskMoney, unmaskMoney, rawValue };
