"use client";

import React, { useState, useEffect, useRef } from "react";
import VoiceRecorder from "./voiceRecorder";

const TelegramForm: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const TG_BOT_API_URL = `https://api.telegram.org/bot7979315922:AAEy5xVGpZvvP8H6RNdkcz2qQWae4uxGrXs
/sendMessage`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const chat_id = "-4562672167";

    const payload = {
      chat_id,
      text: `Поступило новое сообщение от ${name}! \nОписание: ${message} \nEmail: ${email}`,
    };

    try {
      await fetch(TG_BOT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      alert("Сообщение отправлено! Ожидайте ответа!");
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
      alert("Ошибка отправки сообщения. Попробуйте еще раз.");
    }
  };

  // const [recording, setRecording] = useState(false); 

  // const [audioURL, setAudioURL] = useState("");
  // const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const audioChunksRef = useRef<Blob[]>([]);

  // const startRecording = async () => {
  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   mediaRecorderRef.current = new MediaRecorder(stream);

  //   mediaRecorderRef.current.start();
  //   setRecording(true);

  //   mediaRecorderRef.current.ondataavailable = (event) => {
  //     audioChunksRef.current.push(event.data);
  //   };

  //   mediaRecorderRef.current.onstop = () => {
  //     const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
  //     const url = URL.createObjectURL(audioBlob);
  //     setAudioURL(url);
  //     audioChunksRef.current = [];
  //   };
  // };

  // const stopRecording = () => {
  //   mediaRecorderRef.current?.stop();
  //   setRecording(false);
  // };

  // const sendVoiceMessage = async () => {
  //   if (audioURL) {
  //     const formData = new FormData();
  //     const response = await fetch(audioURL);
  //     const blob = await response.blob();
  //     formData.append("voiceMessage", blob, "voice_message.wav");

  //     await fetch(
  //       "https://api.telegram.org/bot7979315922:AAEy5xVGpZvvP8H6RNdkcz2qQWae4uxGrXs/sendVoice",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //   }
  // };
  return (
    <section
      id="registration-form"
      className="items-center justify-center flex flex-col w-1/2 "
    >
      <h2 className="text-center text-2xl font-bold mb-5 w-1/2">Заполните форму</h2>
      <form onSubmit={handleSubmit} className="w-1/3">
        <div className="flex mt-1 flex-col">
          <label className="block mb-2 text-sm font-medium">Имя:</label>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            className="border bg-gray-300 p-2 text-black rounded-xl"
          />
        </div>
        <div className="flex mt-1 flex-col">
          <label className="block mb-2 text-sm font-medium">Email:</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border bg-gray-300 p-2  text-black rounded-xl"
          />
        </div>
        <div className="flex mt-1 flex-col">
          <label className="block mb-2 text-sm font-medium">Описание:</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            className="border bg-gray-300 p-2 text-black rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl  mt-5 bg-purple-500 cursor-pointer hover:bg-purple-900 transition-colors duration-200 text-white p-2 rounded-xl"
        >
          Отправить
        </button>
        {/* ГОЛОСОВОЕ СООБЩЕНИЕ */}
        {/* <div className="flex flex-col items-center mt-5">
          <p className="mt-3 mb-2">
            Не можете написать сообщение? Запишите его!
          </p>
          <button
            className={`bg-purple-600 text-white p-2 rounded ${recording ? "bg-red-500" : ""}`}
            onClick={recording ? stopRecording : startRecording}
          >
            {recording ? "Стоп" : "Записать голосовое сообщение"}
          </button>
          {audioURL && (
            <div className="mt-5">
              <audio controls src={audioURL} />
              <button
                className="bg-green-500 mt-5 text-white p-2 rounded"
                onClick={sendVoiceMessage}
              >
                Отправить голосовое сообщение
              </button>
            </div>
          )}
        </div> */}
        <VoiceRecorder/>
      </form>
    </section>
  );
};

export default TelegramForm;
