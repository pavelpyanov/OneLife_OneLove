import "./globals.css";
import type { Metadata } from "next";
import { Roboto, Island_Moments } from "next/font/google";
import TopNav from "./components/TopNav";
import BottomInfo from "./components/BottomInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["cyrillic"] });
const island = Island_Moments({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One IT Team",
  description: "One life...One love...One IT team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="h-[100vh] flex flex-col">
          <TopNav />
          <BottomInfo />
          <div className="mx-auto container flex-auto pt-[120px]">
            {children}
          </div>
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
