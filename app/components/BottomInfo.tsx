"use client";

import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const BottomInfo = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`z-20 fixed bottom-0 left-0 right-0 border-t-2 border-black h-[100px] bg-mainPurple ease-linear duration-200 flex gap-3 items-center justify-between p-4 
      ${!isOpen ? "translate-y-full" : ""}
      `}
    >
      <p className="text-xs h-full">
        Приложение не отправляет и хранит ваши данные. Файлы cookie не
        используются. Расчеты сохранятся в вашем браузере
      </p>
      <button onClick={() => setIsOpen(false)}>
        <IoIosClose size={25} />
      </button>
    </div>
  );
};

export default BottomInfo;
