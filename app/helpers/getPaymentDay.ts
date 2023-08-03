import { toast } from "react-toastify";
import { data } from "../data/data";
import { Months, TypeOptions, Year } from "./types";

interface Props {
  month: Months;
  year: Year;
  type: TypeOptions;
}

export const getPaymentDate = ({ month, year, type }: Props) => {
  const calendar = data[year];

  let paymentMonth = parseInt(month);

  if (type === "postpayment") {
    paymentMonth += 1;
  }

  if (paymentMonth > 11) {
    paymentMonth = 1;
  }

  if (!calendar) {
    throw new Error("Года нет в календаре");
  }

  const standartDate = type === "prepayment" ? 28 : 13;

  let day = standartDate;

  while (calendar[String(paymentMonth) as Months].freeDays.includes(day)) {
    day -= 1;
  }

  const result = new Date();

  result.setFullYear(+year);
  result.setMonth(+paymentMonth);
  result.setDate(+day);

  return result;
};
