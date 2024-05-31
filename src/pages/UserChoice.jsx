import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";

function UserChoice() {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (userChoice) => {
    setSelectedUser(userChoice);
  };

  const handleSignupClick = () => {
    if (selectedUser === 1) {
      navigate("/login");
    } else if (selectedUser === 2) {
      navigate("/inslogin");
    } else {
      alert("Please select a user type before signing up.");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="Logo" /> {/* Assuming 'logo' is a valid image path */}
      </nav>

      <div className="form-container xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Choose User Type</p>

        <div className="flex justify-center items-center gap-10">
          <div
            className={`card w-60 h-60 rounded-lg shadow-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 transition-transform ${
              selectedUser === 1 ? "border-2 border-[#8000FF]" : ""
            }`}
            onClick={() => handleCardClick(1)}
          >
            <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {/* Replace this with your preferred SVG icon for User */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-xl mt-4">User</p>
          </div>

          <div
            className={`card w-60 h-60 rounded-lg shadow-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 transition-transform ${
              selectedUser === 2 ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(2)}
          >
            <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-xl mt-4">Institution</p>
          </div>
        </div>

        
        <div className="flex justify-center mt-10"> 
          <button type="submit" className="loginBut w-[500px] items-center"  onClick={handleSignupClick}>
            <span>Log In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserChoice;