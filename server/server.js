// server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

// Настройка CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка Multer для хранения загружаемых файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    fs.mkdirSync(uploadPath, { recursive: true }); // Создаем папку, если не существует
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Сохраняем файл под оригинальным именем
  },
});

const upload = multer({ storage });

// Функция для генерации серийного номера
function generateSerialNumber() {
  const length = Math.floor(Math.random() * (14 - 7 + 1)) + 7; // длина от 7 до 14
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let serialNumber = "";

  for (let i = 0; i < length; i++) {
    serialNumber += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return serialNumber;
}

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Request body:", req.body); // Логируйте тело запроса
  console.log("Uploaded file:", req.file); // Логируйте загруженный файл
  if (!req.file) {
    return res.status(400).send("Нет файла для загрузки здесь!.");
  }
  const { tema, opisanie } = req.body;

  // Логика обработки файла
  const filePath = path.join(__dirname, "uploads", req.file.filename);

  // Считываем файл
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Ошибка при чтении файла.");
    }

    // Обработка файла: считаем количество строк и символов
    const lines = data.split("\n").length;
    const characters = data.length;

    // Отправляем результат обработки пользователю
    res
      .status(200)
      .send(
        `Файл загружен успешно! Всего строк: ${lines}, Всего символов: ${characters}`
      );

    console.log("Файл загружен:", req.file);

    // res.status(200).json({ message: "Файл успешно загружен" });
    res.status(200);
    // if (!tema || !opisanie) {
    //   return res.status(400).send("ТЕМА и ОПИСАНИЕ обязательны.");
    // }

    const serialNumber = generateSerialNumber();
    const csvLine = `${tema},${opisanie},${serialNumber}\n`;
    const filePath = path.join(__dirname, "uploads", "train_data.csv");

    // Запись данных в CSV-файл
    fs.appendFile(filePath, csvLine, (err) => {
      if (err) {
        return res.status(500).send("Ошибка при записи в файл.");
      }
      // res.status(200).send("Данные успешно добавлены в CSV.");
      res.status(200);
    });
  });
});
// Эндпоинт для проверки работоспособности сервера
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Сервер работает! Используйте POST /upload для загрузки файлов.");
});
app.get("/upload", upload.single("file"), (req, res) => {
  res
    .status(200)
    .send("Сервер работает! Используйте POST /upload для загрузки файлов.");
});

// Эндпоинт для получения списка загруженных файлов (дополнительно)
app.get("/files", (req, res) => {
  const uploadPath = path.join(__dirname, "uploads");
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).send("Ошибка при чтении каталога.");
    }
    res.status(200).json(files); // Возвращаем список файлов в формате JSON
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
