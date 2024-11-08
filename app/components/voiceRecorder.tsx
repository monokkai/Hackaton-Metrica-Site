import React, { useState } from "react";

const VoiceMessage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      setAudioBlob(event.data);
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  const sendVoiceMessage = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("chat_id", "-4562672167");
    formData.append("voice", audioBlob, "voice_message.ogg");

    const response = await fetch(
      `https://api.telegram.org/bot7979315922:AAEy5xVGpZvvP8H6RNdkcz2qQWae4uxGrXs
/sendVoice`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.ok) {
      alert("Голосовое сообщение успешно отправлено!");
    } else {
      alert("Ошибка при отправке голосового сообщения: " + data.description);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p className="text-sm text-center mt-4">Не можете записать? Скажите!</p>
      {isRecording ? (
        <button
          onClick={stopRecording}
          className="bg-red-500 text-white p-2 rounded"
        >
          Закончить запись
        </button>
      ) : (
        <button
          onClick={startRecording}
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-900 transition-colors duration-200"
        >
          Начать запись
        </button>
      )}
      <button
        onClick={sendVoiceMessage}
        className="bg-green-800 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200"
      >
        Оправить сообщение
      </button>
    </div>
  );
};

export default VoiceMessage;
