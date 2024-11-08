import React, { useState, useRef } from "react";

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks: Blob[] = [];

  const handleStartRecording = async () => {
    setIsRecording(true);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      setAudioBlob(audioBlob);
      audioChunks.length = 0; // Очистка массива
    };

    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "voice_message.wav");

    const response = await fetch(
      "https://api.telegram.org/bot7979315922:AAEy5xVGpZvvP8H6RNdkcz2qQWae4uxGrXs/sendVoice",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("Голосовое сообщение отправлено!");
      setAudioBlob(null); // Очистить аудио после отправки
    } else {
      alert("Ошибка при отправке!");
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <p className="mt-1 mb-3 text-center">Не можете написать? Запишите голосом!</p>
      <button
        className={`px-4 py-2 text-white ${isRecording ? "bg-red-500" : "bg-purple-500"} rounded`}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? "Остановить запись" : "Записать голосовое сообщение"}
      </button>

      {audioBlob && (
        <div className="mt-4">
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleSendAudio}
          >
            Отправить голосовое сообщение
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
