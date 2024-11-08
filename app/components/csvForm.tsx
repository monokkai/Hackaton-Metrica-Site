import React, { useState } from "react";

const CsvUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<string[][]>([]);
  const [theme, setTheme] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [results, setResults] = useState<
    { pointOfFailure: string; equipmentType: string; serialNumber: string }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      parseCsv(selectedFile);
    }
  };

  const parseCsv = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split("\n").map((row) => row.split(","));
      setData(rows);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = [
      ...data,
      [
        theme,
        description,
        "Точка отказа",
        "Тип оборудования",
        "Серийный номер",
        index,
      ],
    ];

    const csvContent =
      "Тема,Описание,Точка отказа,Тип оборудования,Серийный номер,index\n" +
      updatedData.map((row) => row.join(",")).join("\n");

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csv: csvContent }),
      });

      if (!response.ok) {
        throw new Error("Ошибка API");
      }

      const data = await response.json();

      // Предполагается, что API возвращает массив объектов с результатами
      setResults(data.results.slice(0, 3)); // 3 резульатта будут сохранены
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Произошла ошибка при отправке данных.");
    }

    // Очистка формы
    setTheme("");
    setDescription("");
    setIndex("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-5 ">Загрузить CSV файл</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4"
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Тема:</label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
            className="w-full bg-gray-200 p-2 text-black border border-gray-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full bg-gray-200 p-2 text-black border border-gray-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Index:</label>
          <input
            type="text"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            required
            className="w-full bg-gray-200 text-black p-2 border border-gray-300 rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl p-2 bg-purple-500 text-white rounded hover:transition-colors duration-200 hover:bg-purple-600"
        >
          Отправить данные
        </button>
      </form>

      {/* Отображение результатов */}
      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mt-4">Результаты</h2>
          <div
            className="overflow-y-scroll h-400"
            style={{ maxHeight: "400px" }}
          >
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li key={index} className="border p-2 rounded bg-gray-100">
                  <p>Точка отказа: {result.pointOfFailure}</p>
                  <p>Тип оборудования: {result.equipmentType}</p>
                  <p>Серийный номер: {result.serialNumber}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
