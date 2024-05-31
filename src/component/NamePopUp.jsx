import React, { useState, useEffect } from "react";
import "../css/namepopup.css"

const NamePopup = ({ onClose }) => {
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const uid = localStorage.getItem("userid");
    const handleChangeName = () => {
      // Implement logic to update the name
      
        const updateName = async () =>{
          try{
            const response = await fetch(`https://prj-certifi-backend.onrender.com/api/auth/updateuser/${uid}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: newName }),
            })
            const responseData = await response.json()
            setNewName(responseData.name)
  
          }catch(error){
            console.error("Error updating name:", error)
          }
          
     } 
     updateName()
      console.log("New name:", newName);
      onClose();
    };
  
  

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Enter a new name</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="popup-content">
          <input
            type="text"
            value={newName}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleChangeName}
            className="relative px-8 py-2 rounded-md bg-violet-500 isolation-auto z-10 border-2 border-violet-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-violet-700 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white"
          >
            Change name
          </button>
        </div>
      </div>
    </div>
  );
};

export default NamePopup;