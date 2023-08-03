"use client";

import Link from "next/link";
import { Island_Moments } from "next/font/google";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const island = Island_Moments({
  weight: ["400"],
  subsets: ["latin"],
});

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-[112px] w-full bg-mainPurple fixed z-30">
      <div className="mx-auto h-full p-4 container grid grid-cols-3 border-b-2 border-black">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <GiHamburgerMenu size={50} />
        </button>
        <div
          className={`flex flex-col items-center justify-center ${island.className}`}
        >
          <div className="text-base">One life...One love...</div>
          <div className="text-2xl">One IT Team</div>
        </div>
        <nav
          className={`fixed z-35 top-[112px] bottom-0 left-0 right-0 bg-mainPurple flex flex-col items-center justify-center gap-14 text-3xl pb-7 -translate-x-full ease-linear duration-200
           ${isOpen ? "translate-x-0" : ""} 
          `}
        >
          <Link onClick={onClose} href="/">
            Главная
          </Link>
          <Link onClick={onClose} href="/description">
            Описание
          </Link>
          <Link onClick={onClose} href="/my-lists">
            Мои расчеты
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default TopNav;
