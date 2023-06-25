import { Button } from "@mui/material";
import { useState } from "react";

const UrlUpload = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [url, setUrl] = useState("");

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded">
          <input
            placeholder="Type the url here..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: 8 }}
            variant="outlined"
            onClick={() => {
              props.setUploadUrl(false);
              setIsModalOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            style={{ marginTop: 8, marginLeft: 8 }}
            variant="contained"
            onClick={() => {
              props.setUploadUrl(false);
              props.handleConfirmUrl(url);
              setUrl("");
              setIsModalOpen(false);
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UrlUpload;
