import swop from "@/axios/swop";

import { format } from "date-fns";

export interface IConvertPayload {
  amount: number;
  currency: string;
  date?: string;
}

export async function convertToBrlCurrency(payload: IConvertPayload) {
  const { amount, currency, date } = payload;

  const graphqlQuery = {
    query: `query ConvertToBRL($amount: BigDecimal!, $currency: String!, $currencies: [String!], $date: Date) {
      convert(
        amount: $amount,
        baseCurrency: $currency,
        quoteCurrencies: $currencies,
        date: $date
      ) {
        quoteAmount
      }
    }`,
    variables: {
      amount: amount,
      currency: currency.toUpperCase(),
      currencies: ["BRL"],
      date: date || format(new Date(), "yyyy-MM-dd"),
    },
  };

  return new Promise((resolve, reject) => {
    swop({
      method: "post",
      data: { ...graphqlQuery },
    })
      .then((response) => {
        resolve(response.data.data.convert);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
