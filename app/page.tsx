import MainForm from "./components/MainForm";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-center">
        Заполни форму и узнай свою зарплату в рублях
      </h1>
      <MainForm />
    </main>
  );
}
