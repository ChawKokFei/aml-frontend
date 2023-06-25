import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Dictaphone = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [audioFile, setAudioFile] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/speech-fraud-detection",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response here
      console.log(response.data);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded">
          {/* <p>Microphone: {listening ? "on" : "off"}</p>
          <p>{transcript}</p>
          <Button variant="outlined" onClick={SpeechRecognition.startListening}>
            Start
          </Button>
          <Button variant="outlined" onClick={SpeechRecognition.stopListening}>
            Stop
          </Button>
          <Button variant="outlined" onClick={resetTranscript}>
            Reset
          </Button>
          <br /> */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="audio">Audio File:</label>
            <br />
            <input
              type="file"
              id="audio"
              accept="audio/*"
              onChange={handleFileChange}
            />
            <br />
            <Button
              style={{ marginTop: 8 }}
              variant="outlined"
              onClick={() => {
                props.setUploadAudio(false);
                setIsModalOpen(false);
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              style={{ marginTop: 8, marginLeft: 8 }}
              variant="contained"
              onClick={() => {
                props.setUploadAudio(false);
                props.handleConfirmAudio(transcript);
                resetTranscript();
                setIsModalOpen(false);
              }}
            >
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Dictaphone;
