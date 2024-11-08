const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fetch = require("node-fetch");
require("dotenv").config(); // Загружаем переменные окружения из .env

const app = express();
const PORT = process.env.PORT || 3001; // Порт сервера
const upload = multer(); // Настройка multer для обработки файлов

// Переменные окружения для Telegram
const TELEGRAM_CHAT_ID = "-4562672167"; // Идентификатор чата
const TELEGRAM_BOT_TOKEN = "7979315922:AAEy5xVGpZvvP8H6RNdkcz2qQWae4uxGrXs"; // Токен бота
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVoice`; // URL для API Telegram

// Разрешение CORS для всех источников
app.use(cors());

// Обработка POST-запроса для голосового сообщения
app.post("/sendVoice", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Нет файла для загрузки.");
  }

  // Формирование данных для отправки в Telegram
  const formData = new FormData();
  formData.append("chat_id", TELEGRAM_CHAT_ID); // chat_id
  formData.append("voice", req.file.buffer, {
    filename: "voice_message.oga",
    contentType: "audio/ogg",
  });

  try {
    // Отправка данных в Telegram
    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    // Проверка ответа от Telegram API
    if (response.ok) {
      res.status(200).send("Голосовое сообщение успешно отправлено!");
    } else {
      console.error("Ошибка Telegram API:", responseData);
      res
        .status(500)
        .send(
          "Ошибка при отправке голосового сообщения: " +
            responseData.description
        );
    }
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).send("Ошибка сервера.");
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
