import React from "react";
import { FaTelegramPlane, FaVk } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-white w-500 mx-auto py-8 px-4 md:flex md:justify-between md:items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <a href="/">
          <img
            src="/assets/logo-basket.png"
            alt="Логотип"
            className="h-10 cursor-pointer hover: transition-transform duration-300 transform hover:scale-110"
          />
        </a>
      </div>
      <div className="text-center mb-4 md:mb-0 flex-col flex">
        <a className="text-lg font-semibold cursor-pointer hover: transition-transform duration-300 transform hover:scale-110">
          О НАС
        </a>
        <a className="text-lg font-semibold cursor-pointer hover: transition-transform duration-300 transform hover:scale-110">
          РАБОТЫ
        </a>
      </div>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a
          href="https://telegram.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <FaTelegramPlane className="h-6 w-6" />
        </a>
        <a
          href="https://vk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <FaVk className="h-6 w-6" />
        </a>
      </div>
      <div className="text-center mt-4 md:mt-4">
        <p className="text-sm">© 2024 DISPATCHER.IO. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
