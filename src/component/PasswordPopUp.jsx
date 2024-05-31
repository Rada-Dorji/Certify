import React, { useState } from "react";
import "../css/passwordpopup.css";

const PasswordPopup = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const uid = localStorage.getItem("userid")
  
  const handleChangePassword = async() => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await fetch(`https://prj-certifi-backend.onrender.com/api/auth/updatepassword/${uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (data.status === "success") {
        console.log("Password updated successfully:", data);
        onClose();
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Change Password</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="popup-content">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleChangePassword}
            className="relative px-8 py-2 rounded-md bg-violet-500 isolation-auto z-10 border-2 border-violet-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-violet-700 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white"
          >
            Change password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPopup;
