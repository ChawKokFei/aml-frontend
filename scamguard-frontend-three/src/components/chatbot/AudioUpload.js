import React, { useState } from "react";

const AudioUpload = (props) => {
  const handleUpload = async (e) => {};

  return (
    <div className="bg-white p-4 rounded">
      <input type="file" accept="audio/*" onChange={handleUpload} />
    </div>
  );
};

export default AudioUpload;
