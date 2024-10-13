const maskMoney = function (
  value: string,
  currency: string,
  isFloatNumber = false,
  withCurrency = false
) {
  let config: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
  };
  let format = parseFloat(value);

  if (!isFloatNumber) {
    format = format / 100;
  }
  if (withCurrency) {
    config = { style: "currency", currency: currency };
  }

  if (value?.length > 0) {
    return Intl.NumberFormat(currency, config).format(format);
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
