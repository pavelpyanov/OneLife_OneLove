import { toast } from "react-toastify";
import { data } from "../data/data";
import { Months, TypeOptions, Year } from "./types";

interface Props {
  month: Months;
  year: Year;
  type: TypeOptions;
}

export const getExchangeDay = ({ month, year, type }: Props) => {
  const calendar = data[year];

  if (!calendar) {
    throw new Error("Года нет в календаре");
  }

  const standartDate = type === "prepayment" ? 15 : calendar[month].days;

  let day = standartDate;

  while (calendar[month].freeDays.includes(day)) {
    day -= 1;
  }

  const result = new Date();

  result.setFullYear(+year);
  result.setMonth(+month);
  result.setDate(+day);

  return result;
};
