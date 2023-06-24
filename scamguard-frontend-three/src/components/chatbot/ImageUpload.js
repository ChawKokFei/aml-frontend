import { useState } from "react";
import "../../index.css";
import { createWorker } from "tesseract.js";

const ImageUpload = (props) => {
  const [ocrData, setOcrData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);

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
    props.setState((state) => ({ ...state, ocrResult: data }));

    console.log(props);
  };

  return (
    <div className="bg-white p-4 rounded">
      <input type="file" accept="image/*" onChange={handleUpload} />
      {imageUrl && (
        <div>
          <div>Your Image</div>
          <img src={imageUrl} height="100px" alt="Uploaded" />
        </div>
      )}
      {progress > 0 && progress < 1 ? (
        <div>{`Reading text: ${Math.round(progress * 100)}%`}</div>
      ) : (
        <div></div>
      )}
      {ocrData ? (
        <div>
          <div>Detected Text</div>
          <div>{ocrData.text}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageUpload;
