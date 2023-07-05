import { useState, useEffect } from "react";
import axios from "axios";
import TypingAnimation from "./TypingAnimation";
import ImageUpload from "./ImageUpload";
import UrlUpload from "./UrlUpload";
import Dictaphone from "./Dictaphone";

const flask = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

const spring = axios.create({
  baseURL: "http://localhost:8081",
});

const CHAT_BOT_URL = "/api/v1/chat-bot";
const CHECK_URL_URL = "api/v1/url-fraud-detection";
const CHECK_AUDIO_URL = "api/v1/speech-fraud-detection";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([
    { type: "bot", message: "Welcome to Scamguard" },
    { type: "bot", message: 'Type "url" for to checking url' },
    { type: "bot", message: 'Type "image" to upload image file for checking' },
    { type: "bot", message: 'Type "audio" to upload audio file for checking' },
    { type: "bot", message: 'For "anything" else, just type your message' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [gptChat, setGptChat] = useState([]);
  const [uploadImage, setUploadImage] = useState(false);
  const [uploadAudio, setUploadAudio] = useState(false);
  const [uploadUrl, setUploadUrl] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.toLowerCase().trim() === "url") {
      console.log("url");
      setUploadUrl(true);
    } else if (inputValue.toLowerCase().trim() === "image") {
      setUploadImage(true);
    } else if (inputValue.toLowerCase().trim() === "audio") {
      setUploadAudio(true);
    } else {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "user", message: inputValue },
      ]);

      setGptChat((prevGptChat) => [
        ...prevGptChat,
        { role: "user", content: inputValue },
      ]);

      sendMessage(CHAT_BOT_URL, inputValue);
    }
    setInputValue("");
  };

  const sendMessage = (url, message, setGptMessageOrNot = true) => {
    const chatMessages = {
      chatMessages: [...gptChat, { role: "user", content: message }],
    };

    console.log(chatMessages);
    setIsLoading(true);

    spring
      .post(url, chatMessages)
      .then((response) => {
        console.log(response.data);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          {
            type: "bot",
            message: response.data[response.data.length - 1].content,
          },
        ]);
        if (setGptMessageOrNot) {
          setGptChat((prevGptChat) => [
            ...prevGptChat,
            {
              role: "assistant",
              content: response.data[response.data.length - 1].content,
            },
          ]);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleConfirm = (inputValue) => {
    const oriValue = inputValue;
    inputValue =
      "Check whether this is a scam or not, I ocr this from a screenshot so it might contains disjointed information.\n\n" +
      inputValue;
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      {
        type: "user",
        message: oriValue,
      },
    ]);

    setGptChat((prevGptChat) => [
      ...prevGptChat,
      {
        role: "user",
        content: inputValue,
      },
    ]);

    sendMessage(CHAT_BOT_URL, inputValue);
  };

  const handleConfirmUrl = (inputValue) => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      {
        type: "user",
        message: inputValue,
      },
    ]);

    setGptChat((prevGptChat) => [
      ...prevGptChat,
      {
        role: "user",
        content: inputValue,
      },
    ]);

    sendMessage(CHECK_URL_URL, inputValue);
  };

  const handleConfirmAudio = async (e, audioFile) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", audioFile);

    await flask
      .post(CHECK_AUDIO_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data[1]);

        setChatLog((prevChatLog) => [
          ...prevChatLog,
          {
            type: "user",
            message: response.data[1],
          },
          {
            role: "bot",
            message: response.data[0][0].content,
          },
        ]);

        setGptChat((prevGptChat) => [
          ...prevGptChat,
          {
            role: "user",
            content: response.data[1],
          },
          {
            role: "assistant",
            content: response.data[0][0].content,
          },
        ]);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto max-w-[700px] ">
      <div className="flex flex-col h-[700px] bg-gray-900">
        <div className="flex-grow p-6 overflow-auto">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.type === "user" ? "bg-purple-500" : "bg-gray-800"
                  } rounded-lg p-4 text-white max-w-sm`}
                >
                  {message.message.split("\n").map((m, index) => {
                    return (
                      <>
                        <p key={index}>{m}</p>
                        {index !== message.message.split("\n").length - 1 && (
                          <br />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            ))}
            {uploadImage && (
              <ImageUpload
                setUploadImage={setUploadImage}
                handleConfirm={handleConfirm}
              />
            )}
            {uploadUrl && (
              <UrlUpload
                setUploadUrl={setUploadUrl}
                handleConfirmUrl={handleConfirmUrl}
              />
            )}
            {uploadAudio && (
              <Dictaphone
                setUploadAudio={setUploadAudio}
                handleConfirmAudio={handleConfirmAudio}
              />
            )}
            {isLoading && (
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <TypingAnimation handleClose={setUploadImage} />
                </div>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <br />
    </div>
  );
};

export default Chat;
