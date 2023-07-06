import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Dictaphone = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [audioFile, setAudioFile] = useState(null);
  const [showConfirmButton, setShowConfirmButtom] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setShowConfirmButtom(true);
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded">
          <form
            onSubmit={(e) => {
              props.setUploadAudio(false);
              setIsModalOpen(false);
              props.handleConfirmAudio(e, audioFile);
            }}
          >
            <label htmlFor="audio">Audio File: </label>
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
                setShowConfirmButtom(false);
              }}
            >
              Close
            </Button>
            {showConfirmButton && (
              <Button
                type="submit"
                style={{ marginTop: 8, marginLeft: 8 }}
                variant="contained"
              >
                Confirm
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Dictaphone;
