import { Accordion, AccordionItem } from "@nextui-org/react";
import TelegramForm from "./telegramForm";
import CSVForm from "./csvForm";

export default function App() {
  return (
    <section className="w-3/4 items-center flex justify-center rounded-xl border-1 border-gray-300 p-4">
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="REGISTRATION"
          subtitle="Press to expand registration"
          title="REGISTRATION"
        >
          <TelegramForm />
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="CSV-SENDER"
          subtitle={
            <span>
              Press to expand <strong>CSV SENDER</strong>
            </span>
          }
          title="CSV SENDER"
        >
          <CSVForm />
        </AccordionItem>
      </Accordion>
    </section>
  );
}
