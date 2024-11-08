const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

app.post("/add-data", (req, res) => {
  const { data } = req.body;
  const csvContent =
    `Тема,Описание,Точка отказа,Тип оборудования,Серийный номер,index\n` +
    data.map((row) => row.join(",")).join("\n") +
    "\n";

  fs.writeFile("data.csv", csvContent, (err) => {
    if (err) {
      console.error("Ошибка при записи файла:", err);
      return res.status(500).send("Ошибка при записи файла");
    }
    res.send("Файл успешно обновлен!");
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
