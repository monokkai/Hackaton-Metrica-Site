"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ButtonWrite from "./buttonWrite";

const Navbar: React.FC = () => {


  return (
    <nav
      id="registration"
      className="transition-transform duration-300 flex justify-between items-center p-4 bg-black-100"
    >
      <div className="flex items-center">
        <a href="/">
          <Image
            src="/assets/logo-basket.png"
            alt="logo"
            className="w-10 mr-2 cursor-pointer hover: transition-transform duration-300 transform hover:scale-110"
            width={30}
            height={30}
          />
        </a>
        <span className="text-2xl font-bold cursor-pointer hover: transition-transform duration-300 transform hover:scale-110">
          <a href="/">DISPATCHER.IO</a>
        </span>
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-6">
          <li className="cursor-pointer text-lg font-semibold hover: transition-transform duration-300 transform hover:scale-110">
            О НАС
          </li>
          <li className="cursor-pointer text-lg font-semibold hover: transition-transform duration-300 transform hover:scale-110">
            РАБОТЫ
          </li>
        </ul>
        <ButtonWrite />
      </div>
    </nav>
  );
};

export default Navbar;
