"use client";

import { useEffect, useState } from "react";
import { ResautCardoOptions } from "../components/MainForm";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import Modal from "../components/Modal";

export default function DescriptionPage() {
  const [list, setList] = useState<ResautCardoOptions[]>();
  const [item, setItem] = useState<ResautCardoOptions | null>(null);

  const onDelete = (date: string) => {
    const prevCounts = JSON.parse(
      window.localStorage.getItem("counts") || "[]"
    ) as ResautCardoOptions[];

    const fileteredPrevCounts = prevCounts.filter(
      (item) => item.paymentDate !== date
    );

    setList(fileteredPrevCounts);
    window.localStorage.setItem("counts", JSON.stringify(fileteredPrevCounts));
  };

  const onCheck = (item: ResautCardoOptions) => {
    setItem(item);
  };

  useEffect(() => {
    const prevCounts = JSON.parse(
      window.localStorage.getItem("counts") || "[]"
    ) as ResautCardoOptions[];

    setList(prevCounts);
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-center">Мои расчеты</h1>
      {list?.map((item) => (
        <div
          key={item.paymentDate}
          className="flex flex-row items-center justify-between py-3"
        >
          <button onClick={() => onCheck(item)}>
            {item.type === "postpayment" ? "Зарплата" : "Аванс"}{" "}
            {new Date(item.paymentDate).toLocaleDateString("ru")}
          </button>
          <button
            onClick={() => onDelete(item.paymentDate)}
            className="text-red-500"
          >
            <AiFillDelete size={25} />
          </button>
        </div>
      ))}
      <Modal item={item} onClose={() => setItem(null)} />
    </main>
  );
}
