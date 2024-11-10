import React, { useState } from "react";
import CSVReader from "react-csv-reader";

const renderTable = (data: (string | number)[][]) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {data[0].map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const SetTable: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<(string | number)[][] | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/uploads", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setCsvData(data.rows); // Set CSV data from response
        setMessage("File uploaded successfully!");
      } else {
        setMessage("Error uploading the file.");
      }
    } catch (error) {
      setMessage("Error uploading the file: " + (error as Error).message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload CSV File</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="file"
          >
            Choose a CSV file
          </label>
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        >
          Upload
        </button>
        {message && <p className="mt-4 text-gray-600">{message}</p>}
        {csvData && renderTable(csvData)}
      </form>
    </div>
  );
};

export default SetTable;
