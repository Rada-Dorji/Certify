import React, { useState } from "react";
import "../css/avatarpopup.css";

const AvatarPopup = ({ onClose }) => {
  const [file, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const userid = localStorage.getItem("userid");

  const handleSave = () => {
    if (file) {
      const formData = new FormData();
      formData.append('photo', file); // Ensure the key matches the one expected in the backend

      fetch(`https://prj-certifi-backend.onrender.com/api/auth/photoUpload/${userid}`, {
        method: 'PATCH',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Upload response:', data);
          if (data.status === 'success') {
            onClose();
          } else {
            console.error('Failed to upload avatar');
          }
        })
        .catch((error) => {
          console.error('Error uploading avatar:', error);
        });
    } else {
      console.error('No file selected');
    }
  };
  return (
    <div className="avatar-popup-overlay">
      <div className="avatar-popup">
        <div className="avatar-popup-header">
          <h3>Upload photo</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="avatar-popup-content">
          <p>
            Drag and drop an image to the field or select a file from your PC
          </p>
          <div className="upload-area">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            <p>Only JPG, PNG files smaller than 10MB</p>
          </div>
        </div>
        <div className="avatar-popup-footer">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSave}
            className="relative px-8 py-2 rounded-md bg-violet-500 isolation-auto z-10 border-2 border-violet-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-violet-700 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPopup;
