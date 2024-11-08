import React, { useState } from "react";

const CsvForm: React.FC = () => {
  const [index, setIndex] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [faultPoint, setFaultPoint] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  let csvData: string[][] = [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRow = [
      theme,
      description,
      faultPoint,
      equipmentType,
      serialNumber,
      index,
    ];
    csvData.push(newRow);

    // Данные в CSV
    const csvContent =
      `Тема,Описание,Точка отказа,Тип оборудования,Серийный номер,index\n` +
      csvData.map((row) => row.join(",")).join("\n") +
      "\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    try {
      const response = await fetch("http://localhost:3002/add-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme,
          description,
          faultPoint,
          equipmentType,
        }),
      });

      const result = await response.text();
      alert(result);
      setIndex("");
      setTheme("");
      setDescription("");
      setFaultPoint("");
      setEquipmentType("");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <div className="w-1/4 mx-auto mt-10 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-12 text-center">
        Форма для заполнения файла
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Тема:</label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
            className="w-full p-2 border border-gray-300  bg-gray-300 rounded-xl text-black"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300  bg-gray-300  rounded-xl text-black"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Точка отказа:
          </label>
          <input
            type="text"
            value={faultPoint}
            onChange={(e) => setFaultPoint(e.target.value)}
            required
            className="w-full p-2 border border-gray-300  bg-gray-300  rounded-xl text-black"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Тип оборудования:
          </label>
          <input
            type="text"
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            required
            className="w-full p-2 border border-gray-300  bg-gray-300  rounded-xl text-black"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Серийный номер:
          </label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
            className="w-full p-2 border border-gray-300  bg-gray-300  rounded-xl text-black"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Index</label>
          <input
            type="text"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            required
            className="w-full p-2 border border-gray-300  bg-gray-300  rounded-xl text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-900 transition-colors duration-200"
        >
          Сохранить в CSV
        </button>
      </form>
    </div>
  );
};

export default CsvForm;
