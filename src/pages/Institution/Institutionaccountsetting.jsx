import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../../css/institutionaccountsetting.css";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { FaSignOutAlt, FaUser, FaEdit } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AvatarPopup from "../../component/AvatarPopup";
import NamePopup from "../../component/NamePopUp";
import PasswordPopup from "../../component/PasswordPopUp";
import EmailPopup from "../../component/EmailPopUp";
import DeleteAccountPopup from "../../component/DeleteAccountPopUp";

const Account = () => {
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [mail, setMail] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [name, setUserName] = useState("");
  
  const uid = localStorage.getItem("userid");

  useEffect(()=>{
    const fetchIns = async()=>{
      try{
        const response = await fetch(`https://prj-certifi-backend.onrender.com/api/institute/getinsbyid/${uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const responseData = await response.json()
        setUserName(responseData.companyName)
        setMail(responseData.email)
        setProfilepic(responseData.photo)
  
      }catch(error){
        console.log(error)
      }
    }
    fetchIns()
  }, [])

  const handleEditAvatar = () => {
    setShowAvatarPopup(true);
  };

  const handleCloseAvatarPopup = () => {
    setShowAvatarPopup(false);
  };

  const handleEditName = () => {
    setShowNamePopup(true);
  };

  const handleCloseNamePopup = () => {
    setShowNamePopup(false);
  };

  const handleEditPassword = () => {
    setShowPasswordPopup(true);
  };

  const handleClosePasswordPopup = () => {
    setShowPasswordPopup(false);
  };

  const handleEditEmail = () => {
    setShowEmailPopup(true);
  };

  const handleCloseEmailPopup = () => {
    setShowEmailPopup(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountPopup(true);
  };

  const handleCloseDeleteAccountPopup = () => {
    setShowDeleteAccountPopup(false);
  };

  return (
    <div className="dashboard-wrapper">
      {showAvatarPopup && (
        <AvatarPopup onClose={handleCloseAvatarPopup} />
      )}
      {showNamePopup && <NamePopup onClose={handleCloseNamePopup} />}
      {showPasswordPopup && (
        <PasswordPopup onClose={handleClosePasswordPopup} />
      )}
      {showEmailPopup && <EmailPopup onClose={handleCloseEmailPopup} />}
      {showDeleteAccountPopup && (
        <DeleteAccountPopup onClose={handleCloseDeleteAccountPopup} />
      )}
      <div className="sidebar">
        <Link to="institutiondashboard" className="logo-container">
          <div className="logo-circle">
            <img src={certifiLogo} alt="CertiFi Logo" className="logo" />
          </div>
          <span className="company-name">CertiFi</span>
        </Link>
        <div className="home">
          <FaUser className="icon" /> Account
        </div>
      </div>
      <div className="main-content">
        <div className="search-bar">

          <div className="user-info">

            <div
              className="profile-image-container"
            >
              <img
                src={profilepic}
                alt="User Profile"
                className="profile-image"
              />
              <span className="username">{name}</span>
            </div>
            <Link to="/">
              <button class="group flex items-center justify-start w-10 h-10 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                <div class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div class="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Logout
                </div>
              </button>
            </Link>
          </div>
        </div>
        <Card className="account-settings-card">
          <CardContent>
            <div className="account-settings-container">
              <Typography
                variant="h5"
                component="div"
                className="account-settings-header"
              >
                Account setting
              </Typography>
              <div className="account-details">
                <div className="account-detail">
                  <div className="label-container">
                    <span className="label">Avatar</span>
                    <div className="avatar-container">
                      <img
                        src={profilepic}
                        alt="Avatar"
                        className="avatar-image"
                      />
                    </div>
                  </div>
                  <div className="edit-container" onClick={handleEditAvatar}>
                    {/* <span className="edit-text">Edit</span>
                    <FaEdit className="edit-icon" /> */}
                  </div>
                </div>
                <div className="account-detail">
                  <span className="label">Name</span>
                  <div className="input-container">
                    <input type="text" value={name} className="input-field" readOnly />
                  </div>
                  <div className="edit-container" onClick={handleEditName}>
                    {/* <span className="edit-text" >Edit</span>
                    <FaEdit className="edit-icon" /> */}
                  </div>
                </div>
                <div className="account-detail">
                  <span className="label">Password</span>
                  <div className="input-container">
                    <input
                      type="password"
                      value="************"
                      className="input-field"
                      readOnly
                    />
                    <div className="edit-container" onClick={handleEditPassword}>
                      {/* <span className="edit-text">Edit</span>
                      <FaEdit className="edit-icon" /> */}
                    </div>{" "}
                  </div>
                </div>
                <div className="account-detail">
                  <span className="label">Email</span>
                  <div className="input-container">
                    <input
                      type="email"
                      value={mail}
                      className="input-field"
                      readOnly
                    />
                    <div className="edit-container" onClick={handleEditEmail}>
                      {/* <span className="edit-text">Edit</span> */}
                      {/* <FaEdit className="edit-icon" /> */}
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div className="delete-account-container">
                <Typography
                  variant="body1"
                  component="div"
                  className="delete-account-label"
                >
                  Delete account
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  className="delete-account-description"
                >
                  Deletion of account will cause immediate loss of account to
                  services associated with your CertiFi account and permanent
                  deletion of your personal information.
                </Typography>
                <button onClick={handleDeleteAccount}
  class="flex justify-center items-center gap-2 w-28 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
>
  <svg viewBox="0 0 15 15" class="w-5 fill-white">
    <svg
      class="w-6 h-6"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></path>
    </svg>
    Delete Account
  </svg>
</button>

              </div>
            </div>
          </CardContent>
        </Card>{" "}
      </div>
    </div>
  );
};

export default Account;
