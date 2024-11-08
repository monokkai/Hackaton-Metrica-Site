"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Statistic from "./mainStat";

const MainInfo: React.FC = () => {
  const phrases = ["DISPATCHER.IO", "БЫСТРО!", "ПОНЯТНО!"];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingRate = 150; // Скорость печати
    const deletingRate = 100; // Скорость стирания

    {
      /*Условие для текста за 1 секунду*/
    }
    if (isDeleting) {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingRate);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingRate);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return (
    <section className="flex flex-col md:flex-row justify-center p-10 mt-12 h-screen">
      <div className="md:w-1/2 flex flex-col justify-center">
        <h1 className="text-6xl font-bold mb-2">{displayText}▌</h1>
        <p className="text-lg mb-4 mt-5">
          <span className="text-purple-500">DISPATCHER.IO</span> - это сервис,
          который поможет вам сэкономить время, деньги, путем автоматизации
          процесса диспетчеризации. Всем известны те часовые задержки, проблемы,
          недозвоны. С помощью{" "}
          <span className="text-purple-500">DISPATCHER.IO</span> вы сможете
          снизить нагрузку и не тратить время на ожидание.
          <span className="text-purple-500">СКАЖИ ЗАДЕРЖКЕ - НЕТ!</span>
        </p>

        {/* ВОЗМОЖНА ДАЛЬШЕЙШАЯ РЕАЛИЗАЦИЯ */}
        {/* <button className="w-1/3 mt-3 bg-purple-500 text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-purple-900 transition-colors duration-200">
          НАЧАТЬ
        </button> */}
        {/* Статистика */}
        <Statistic />
      </div>

      {/* Часть с картинкой */}
      <div className="md:w-1/2 flex justify-end">
        <div className="relative flex items-center justify-center">
          <Image
            src="/assets/programmer.png"
            alt="Картинка"
            className="rounded-2xl mt-2"
            width={400}
            height={400}
          />

          {/* ВОЗМОЖНА ДАЛЬШЕЙШАЯ РЕАЛИЗАЦИЯ */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-600 shadow-lg">
            <h3>О НАС</h3>
            <p className="text-xs mt-1">В ПЕКЛО</p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default MainInfo;
