"use client";
import React, { useState } from "react";

const CallButton: React.FC = () => {
  const phoneNumber = "+79632988488"; 
  const [message, setMessage] = useState<string | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setMessage("Номер скопирован");
      setTimeout(() => setMessage(null), 2000); // Удаляем сообщение через 2 секунды
    } catch (err) {
      setMessage("Ошибка при копировании");
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center">
      <button
        onClick={copyToClipboard}
        className="w-15 h-12 rounded-3xl p-5 px-4 py-2 bg-purple-500 text-white font-bold rounded hover:bg-purple-900 transition duration-300 shadow-lg"
      >
        &#128222;
      </button>
      {message && <p className="mt-2 text-purple-500">{message}</p>}
    </div>
  );
};

export default CallButton;
