"use client";

import Link from "next/link";
import Button from "./Button";
import CardField from "./CardField";
import { ResautCardoOptions } from "./MainForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  resultCardOptions: ResautCardoOptions;
  saveButton?: boolean;
  routeButton?: boolean;
}

const ResultCard: React.FC<Props> = ({
  resultCardOptions,
  saveButton,
  routeButton,
}) => {
  const { type, amountRUB, amountUZS, exchange, exchangeDate, paymentDate } =
    resultCardOptions;

  const router = useRouter();

  const formatNumber = new Intl.NumberFormat("ru").format;

  const saveToLocalStorage = () => {
    const prevCounts = JSON.parse(
      window.localStorage.getItem("counts") || "[]"
    ) as ResautCardoOptions[];

    const fileteredPrevCounts = prevCounts.filter(
      (item) => item.paymentDate !== paymentDate
    );
    fileteredPrevCounts.push(resultCardOptions);

    fileteredPrevCounts.sort(
      (a, b) =>
        new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime()
    );

    window.localStorage.setItem("counts", JSON.stringify(fileteredPrevCounts));
    toast.success("Расчет успешно сохранен");
    router.push("/my-lists");
  };

  return (
    <div className="border-2 border-mainPurple mt-3 p-3 mb-3">
      <h1 className="mt-3 mb-3 text-lg font-medium">Результат расчета</h1>
      <div className="flex flex-col gap-3 justify-center">
        <CardField
          title="Тип поступления:"
          value={type === "postpayment" ? "Зарплата" : "Аванс"}
        />
        <CardField
          title="Дата оплаты:"
          value={new Date(paymentDate).toLocaleDateString("ru")}
        />
        <CardField
          title="Дата обмена валюты:"
          value={new Date(exchangeDate).toLocaleDateString("ru")}
        />
        <CardField
          title="Курс обмена валюты RUB/UZS:"
          value={formatNumber(exchange)}
        />
        <CardField title="Приход в UZS:" value={formatNumber(amountUZS)} />
        <CardField title="Приход в RUB:" value={formatNumber(amountRUB)} />
      </div>
      <div className="flex md:flex-row mt-4 flex-col gap-4">
        {saveButton && (
          <Button onClick={saveToLocalStorage}>Сохранить расчет</Button>
        )}
        {routeButton && (
          <Link
            className="w-[225px] mx-auto py-2 bg-mainPurple border-2 border-black rounded-lg flex items-center justify-center"
            href="/my-lists"
          >
            Перейти к расчетам
          </Link>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
