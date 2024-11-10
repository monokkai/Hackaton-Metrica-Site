const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const app = express();
const http = require("http");
const PORT = 3001;

// Настройка CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка Multer для хранения загружаемых файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    fs.mkdirSync(uploadPath, { recursive: true }); // Создаем папку
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Сохраняем файл
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

app.get("/upload", upload.single("file"), (req, res) => {
  res
    .status(200)
    .send("Сервер работает! Используйте POST /upload для загрузки файлов.");
});

app.post("/upload", upload.single("file"), (req, res) => {
  let body = "";
  app.on("data", (chunk) => {
    body += chunk;
  });
  app.on("end", () => {
    console.log("Request body:", body); // Логируйте тело запроса
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(body));
  });
  // console.log("Request body:", req.body); // Логируйте тело запроса
  // console.log("Uploaded file:", req.file); // Логируйте загруженный файл
  if (!req.file) {
    return res.status(400).send("Нет файла для загрузки здесь!");
  }
  const { tema, opisanie } = req.body;

  // Логика обработки файла
  const filePath = path.join(__dirname, "uploads", req.file.filename);

  // Считываем файл
  fs.readFile(filePath, "utf8", (err, data) => {
    // Обработка файла: считаем количество строк и символов
    const lines = data.split("\n").length;
    const characters = data.length;

    // Отправляем результат обработки пользователю
    res.status(200);

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

    const form = new FormData();
    form.append(
      "file",
      fs.createReadStream("../server/uploads/train_data.csv")
    );

    // Опции для HTTP-запроса
    const options = {
      method: "POST",
      host: "localhost",
      port: 5001,
      path: "/upload",
      headers: {
        ...form.getHeaders(), // Добавляем необходимые заголовки
      },
    };

    if (req.file) {
      fs.readFile(
        path.join(__dirname, "uploads", req.file.filename),
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error reading the file");
          }

          const rows = data.split("\n").map((row) => row.split(","));
          res.render("display", { rows });
        }
      );
    } else {
      res.status(400).send("No file uploaded");
    }

    // Создание HTTP-запроса
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);

      // Обработка данных ответа
      res.on("data", (chunk) => {
        console.log("Response: ", chunk.toString());
      });

      res.on("end", () => {
        console.log("File uploaded successfully.");
      });
    });
    // if (!req.file) {
    //   return res.status(400).send("Нет файла для загрузки.");
    // }
    // res.status(200).send(`Файл ${req.file.originalname} успешно загружен.`);

    // Обработка ошибок запроса
    req.on("error", (err) => {
      console.error("Error uploading file: ", err);
    });

    // Присоединение данных формы к запросу
    form.pipe(req);

    // Завершение запроса только после того, как данные потока закончены
    form.on("finish", () => {
      req.end(); // Завершаем запрос
    });
  });
});

// Эндпоинт для проверки работоспособности сервера
app.get("/", (req, res) => {
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
