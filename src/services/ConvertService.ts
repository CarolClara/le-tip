import swop from "@/axios/swop";

import { format } from "date-fns";

export interface IConvertPayload {
  amount: number;
  currency: string;
  date?: string;
}

export async function convertToBrlCurrency(payload: IConvertPayload) {
  const { amount, currency, date } = payload;

  return new Promise((resolve, reject) => {
    swop
      .get(`/conversions/${currency.toUpperCase()}/BRL`, {
        params: {
          amount: amount,
          date: date || format(new Date(), "yyyy-MM-dd"),
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
