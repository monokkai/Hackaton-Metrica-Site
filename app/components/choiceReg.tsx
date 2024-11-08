import CSVForm from "./csvForm";
import TelegramForm from "./telegramForm";

const ChoiceReg = () => {
  return (
    //Вид форм на выбор пользователя!
    <section className="flex flex-row items-center justify-center w-full">
      <TelegramForm />
      <CSVForm />
    </section>
  );
};

export default ChoiceReg;
