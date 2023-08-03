"use client";

import Select, { Theme } from "react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Months, TypeOptions, Year } from "../helpers/types";
import { getPaymentDate } from "../helpers/getPaymentDay";
import { getExchangeDay } from "../helpers/getExchangeDate";
import { useState } from "react";
import ResultCard from "./ResultCard";
import Button from "./Button";
import { toast } from "react-toastify";

const SelectStyles = {
  theme: (theme: Theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "rgb(255, 210, 210)",
      primary25: "#ffedd5",
      neutral20: "black",
    },
  }),
};

interface Form {
  type: { value: TypeOptions; label: string };
  month: { value: Months; label: string };
  year: { value: Year; label: string };
  amountUZS: string;
}

export interface ResautCardoOptions {
  type: TypeOptions;
  paymentDate: string;
  exchangeDate: string;
  amountUZS: number;
  amountRUB: number;
  exchange: number;
}

const MainForm = () => {
  const [resultCardOptions, setResultCardOptions] =
    useState<ResautCardoOptions>();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({});

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const preparedData = {
      ...data,
      type: data.type.value,
      month: data.month.value,
      year: data.year.value,
    };

    try {
      const paymentDate = getPaymentDate({
        month: preparedData.month,
        type: preparedData.type,
        year: preparedData.year,
      });

      const exchangeDate = getExchangeDay({
        month: preparedData.month,
        type: preparedData.type,
        year: preparedData.year,
      });

      const exchangeString = `${exchangeDate.getFullYear()}-${
        exchangeDate.getMonth() + 1
      }-${exchangeDate.getDate()}`;

      const response = await fetch(
        `https://cbu.uz/ru/arkhiv-kursov-valyut/json/RUB/${exchangeString}/`
      );

      if (!response.ok) {
        throw new Error("Ошибка запроса курса валют");
      }

      const data = await response.json();

      setResultCardOptions({
        type: preparedData.type,
        amountUZS: parseFloat(preparedData.amountUZS),
        amountRUB: parseFloat(preparedData.amountUZS) / data[0].Rate,
        exchange: data[0].Rate as number,
        exchangeDate: exchangeDate.toISOString(),
        paymentDate: paymentDate.toISOString(),
      });

      toast.success("Расчет обновлен");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label>Тип поступления</label>
          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  placeholder="Выбери тип"
                  options={[
                    { value: "prepayment", label: "Аванс" },
                    { value: "postpayment", label: "Зарплата" },
                  ]}
                  {...SelectStyles}
                />
                {fieldState.error && (
                  <p className="text-red-600">Обязательно для выбора</p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>За месяц</label>
          <Controller
            control={control}
            name="month"
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  placeholder="Выбери месяц"
                  options={[
                    { value: "0", label: "Январь" },
                    { value: "1", label: "Февраль" },
                    { value: "2", label: "Март" },
                    { value: "3", label: "Апрель" },
                    { value: "4", label: "Май" },
                    { value: "5", label: "Июнь" },
                    { value: "6", label: "Июль" },
                    { value: "7", label: "Август" },
                    { value: "8", label: "Сентябрь" },
                    { value: "9", label: "Октябрь" },
                    { value: "10", label: "Ноябрь" },
                    { value: "11", label: "Декабрь" },
                  ]}
                  {...SelectStyles}
                />
                {fieldState.error && (
                  <p className="text-red-600">Обязательно для выбора</p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Год</label>
          <Controller
            control={control}
            name="year"
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  placeholder="Выбери год"
                  options={[{ value: "2023", label: "2023" }]}
                  {...SelectStyles}
                />
                {fieldState.error && (
                  <p className="text-red-600">Обязательно для выбора</p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Сумма в UZS</label>
          <input
            {...register("amountUZS", { required: true })}
            placeholder="Сколько милионов пришло?"
            className="rounded-[4px] p-2 border border-black outline-none focus:border-mainPurple"
            type="number"
          />
          {errors.amountUZS && (
            <p className="text-red-600">Обязательно для ввода</p>
          )}
        </div>
        <Button type="submit">Рассчитать</Button>
      </form>
      {resultCardOptions && (
        <ResultCard
          resultCardOptions={resultCardOptions}
          saveButton
          routeButton
        />
      )}
    </>
  );
};

export default MainForm;
