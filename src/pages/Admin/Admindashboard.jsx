import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../css/admindashboard.css";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { FaHome, FaCog, FaEye, FaEyeSlash } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState(
    Array(formData.length).fill(false)
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [location, setLocation] = useState("");
  const [username, setUserName] = useState("");

  const navigate = useNavigate()
  const Logout = () => {
    window.localStorage.setItem("adminLoggedIn", "false")
    window.localStorage.removeItem("email")
    window.localStorage.removeItem("adminLoggedIn")
    
    navigate("/adminlogin")
    window.location.reload()
  }

 useEffect(()=>{
  if (!window.localStorage.getItem("adminLoggedIn")) {
    navigate("/adminlogin")
  }
  const fetchUser = async()=>{
    try{
      const response = await fetch('https://prj-certifi-backend.onrender.com/admin/getadmin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const responseData = await response.json()
      // console.log(responseData.data.name)
      setUserName(responseData.data.name)

    }catch(error){
      console.log(error)
    }
  }
  const fetchInstitutions = async() =>{
    try{
      const response = await fetch("https://prj-certifi-backend.onrender.com/admin/getallins",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

      })
      const responseData = await response.json()
      console.log(responseData.data)
      setFormData(responseData.data)

    }catch(error){
      console.log(error)
    }
  }
  fetchInstitutions()
  fetchUser()
 }, []);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const InstitutionModal = () => {
    const handleSubmit = (e) => {
      e.preventDefault();

      // Validate form fields
      const companyName = e.target.elements.companyName.value.trim();
      const institutionType = e.target.elements.institutionType.value.trim();
      const location = e.target.elements.location.value.trim();
      const emailAddress = e.target.elements.emailAddress.value.trim();
      const password = e.target.elements.password.value.trim();
      const confirmPassword = e.target.elements.confirmPassword.value.trim();

      fetch('https://prj-certifi-backend.onrender.com/admin/registerIns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: companyName,
          instituteType: institutionType,
          instituteLocation: location,
          email: emailAddress,
          password: password,
        }),

      })
      .then((response) => response.json())
      .then((data)=>{
        if(data.status === 'success'){
          console.log(data)
        }
      })
      if (
        !companyName ||
        !institutionType ||
        !location ||
        !emailAddress ||
        !password ||
        !confirmPassword
      ) {
        alert("All fields are required");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Proceed with form submission if all validations pass
      const formValues = {
        companyName,
        institutionType,
        location,
        emailAddress,
        password,
      };
      setFormData([...formData, formValues]);
      closeModal();
    };

    return (
      <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Add Institution</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Company Name" name="companyName" />
            <input
              type="text"
              placeholder="Institution Type"
              name="institutionType"
            />
            <input type="text" placeholder="Location" name="location" />
            <input
              type="email"
              placeholder="Email Address"
              name="emailAddress"
            />
            <input type="password" placeholder="Password" name="password" />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
            <button
              type="submit"
              className="relative px-8 py-2 rounded-md bg-violet-500 isolation-auto z-10 border-2 border-violet-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-violet-700 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const toggleTablePasswordVisibility = (index) => {
    const newVisiblePasswords = [...visiblePasswords];
    newVisiblePasswords[index] = !newVisiblePasswords[index];
    setVisiblePasswords(newVisiblePasswords);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-circle">
            <img src={certifiLogo} alt="CertiFi Logo" className="logo" />
          </div>
          <span className="company-name">CertiFi</span>
        </div>
        <div className="home">
          <FaHome className="icon" /> Home
        </div>
      </div>
      <div className="main-content">
        <div className="search-bar">
          <div className="user-info">
            <div
              className="profile-image-container"
              onClick={toggleUserDropdown}
            >
              <img
                src={userProfileImage}
                alt="User Profile"
                className="profile-image"
              />
              <span className="username">{username}</span>
              {showUserDropdown && (
                <div className="user-dropdown">
                  <Link to="/accountsetting" className="user-dropdown-content">
                    <FaCog className="settings-icon" />
                    <span>Settings</span>
                  </Link>
                </div>
              )}
            </div>
           
              <button  className="group flex items-center justify-start w-10 h-10 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1" onClick = {Logout}>
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Logout
                </div>
              </button>
          </div>
        </div>
        <Card>
          <CardContent>
            <div className="documents-header">
              <Typography variant="h5" component="div">
                Institutions
              </Typography>
            </div>
            <div className="documents-table">
              <div className="table-header admin-header">
                <div>Company Name</div>
                <div>Institution Type</div>
                <div>Location</div>
                <div>Email Address</div>
                <div>Password</div>
              </div>
              {formData.map((data, index) => (
                <div key={index} className="table-row">
                  <div>{data.companyName}</div>
                  <div>{data.instituteType}</div>
                  <div>{data.instituteLocation}</div>
                  <div>{data.email}</div>
                  <div className="password-container">
                    {visiblePasswords[index] ? (
                      <span>{data.password}</span>
                    ) : (
                      <span>********</span>
                    )}
                    <span
                      className="password-toggle-icon"
                      onClick={() => toggleTablePasswordVisibility(index)}
                    >
                      {visiblePasswords[index] ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="document-wrapper">
              <div className="no-documents-text">
                {formData.length === 0 ? "No Institutes" : null}
              </div>

              <button
                onClick={toggleModal}
                className="bg-violet-800 text-white border border-violet-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              >
                <span className="bg-violet-400 shadow-violet-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Add Institution
              </button>
            </div>
          </CardContent>
        </Card>
        <InstitutionModal />
      </div>
    </div>
  );
};

export default Dashboard;
