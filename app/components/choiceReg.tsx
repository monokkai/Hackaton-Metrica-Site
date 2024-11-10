import CSVForm from "./csvForm";
import TelegramForm from "./telegramForm";
import SetTable from "./setTable";

const ChoiceReg = () => {
  return (
    //Вид форм на выбор пользователя!
    <section className="flex flex-row items-center justify-center w-full">
      {/* <TelegramForm /> */}
      <CSVForm />
      {/* <SetTable /> */}
    </section>
  );
};

export default ChoiceReg;
