import React, { useState } from "react";
import "../css/namepopup.css";

const EmailPopup = ({ onClose }) => {
  const [newEmail, setNewEmail] = useState("");

  const handleChangeEmail = () => {
    // Implement logic to change the email
    console.log("New Email:", newEmail);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Enter a new e-mail</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="popup-content">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="smt@gmail.com"
          />
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleChangeEmail}
            className="relative px-8 py-2 rounded-md bg-violet-500 isolation-auto z-10 border-2 border-violet-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-violet-700 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white"
          >
            Change e-mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
