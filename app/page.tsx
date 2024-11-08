"use client";
import Navbar from "./components/navbar";
import MainInfo from "./components/mainInfo";
import CallButton from "./components/callButton";
import TelegramForm from "./components/telegramForm";
import Footer from "./components/footer";
import { useRef } from "react";
import Caroucel from "./components/caroucelLoyal";
import AccordionCSV from "./components/accordion";
import ChoiceReg from "./components/choiceReg";
import Layout from "./components/layouts/article";
const HomePage: React.FC = () => {
  const registrationRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "registration" && registrationRef.current) {
      registrationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const images = [
    "/assets/partner1.png",
    "/assets/partner2.jpg",
    "/assets/partner3.jpg",
  ];
  return (
    <Layout title={"main page"}>
      <section className="w-4/5 mx-auto">
        {/* Navbar */}
        <Navbar />

        {/* Инфрмация о нас */}
        <MainInfo />

        {/* Кнопка вызова если остались вопросы или не понятно! */}
        <div>
          <CallButton />
        </div>
        <div ref={registrationRef} className="flex justify-center items-center">
          {/* <TelegramForm /> */}
          {/* <AccordionCSV /> */}
          <ChoiceReg />
        </div>
        {/* <Caroucel images={images} /> */}
        {/* Футер */}
        <Footer />
      </section>
    </Layout>
  );
};

export default HomePage;
