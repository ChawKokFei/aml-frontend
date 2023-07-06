import { Button } from "@mui/material";
import { useState } from "react";
import { createWorker } from "tesseract.js";

const ImageUpload = (props) => {
  const [ocrData, setOcrData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showConfirmButton, setShowConfirmButtom] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));

    const worker = await createWorker({
      logger: (m) => {
        console.log("[OCR] '" + file.name + "' : ", m["progress"] * 100 + "%");
        setProgress(m["progress"]);
      },
    });
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(file);
    setOcrData(data);
    console.log(data.text);
    await worker.terminate();

    console.log("hello image");
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
          <label htmlFor="image">Image File: </label>
          <br />
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />
          {imageUrl && (
            <div>
              <img src={imageUrl} style={{ height: 500 }} alt="Uploaded" />
            </div>
          )}
          <br />
          <Button
            style={{ marginTop: 8 }}
            variant="outlined"
            onClick={() => {
              props.setUploadImage(false);
              setIsModalOpen(false);
            }}
          >
            Close
          </Button>
          {showConfirmButton && (
            <Button
              style={{ marginTop: 8, marginLeft: 8 }}
              variant="contained"
              onClick={() => {
                props.setUploadImage(false);
                props.handleConfirm(ocrData.text);
                setIsModalOpen(false);
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
