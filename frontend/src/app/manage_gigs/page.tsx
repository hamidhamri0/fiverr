"use client";
import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3001/cloudinary/image", true);

    xhr.setRequestHeader("Content-Type", "multipart/form-data");

    xhr.upload.onprogress = (progressEvent) => {
      console.log(progressEvent);
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      setProgress(progress);
    };

    xhr.onloadend = () => {
      console.log("Upload complete:", xhr.responseText);
    };

    xhr.send(formData);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <progress value={progress} max="100" />
      <p>{progress}%</p>
    </div>
  );
}

export default FileUpload;
