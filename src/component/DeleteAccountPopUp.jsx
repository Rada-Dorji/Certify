import React from "react";
import "../css/deleteaccountpopup.css"
import { useNavigate } from "react-router-dom";

const DeleteAccountPopup = ({ onClose }) => {
  const uid = localStorage.getItem("userid");
  const navigate = useNavigate()

  const handleDeleteAccount = () => {
    const deleteAccount = async () => {
      try{
        // Implement logic to delete the account
        const response = fetch(`https://prj-certifi-backend.onrender.com/api/auth/deleteuser/${uid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const responseData = await response.json()
        console.log(responseData)
        if(responseData.status === "success"){
          navigate("/login")
        }
      }catch(error){
        console.log(error)
      }
  }
    deleteAccount()
    onClose();
  
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Delete account</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="popup-content">
          <p>
            Are you sure want to delete Your account? You will loose immediately
            loose access to all related services
          </p>
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Cancel</button>

          <button onClick={handleDeleteAccount}
  class="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
>
  <svg
    stroke="currentColor"
    viewBox="0 0 24 24"
    fill="none"
    class="h-5 w-5 mr-2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    ></path>
  </svg>

  Delete
</button>

        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;