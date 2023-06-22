import { useState } from "react";

const ImageUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    console.log("hello image");
    setIsModalOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded">
          <h2>Upload Image</h2>
          <input type="file" accept="image/*" onChange={handleUpload} />
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
