import React, { useState } from "react";
import "../../css/dashboard1.css";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import metamaskLogo from "../../assets/metamask-logo.png";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  FaSignOutAlt,
  FaSearch,
  FaPlusCircle,
  FaHome,
  FaEdit,
  FaTrashAlt,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleCreateDropdown = () => {
    setShowCreateDropdown(!showCreateDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
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
        <div className="create-btn-container">
          <button className="create-btn" onClick={toggleCreateDropdown}>
            <FaPlusCircle className="icon" /> Create
            {showCreateDropdown && (
              <div className="create-dropdown">
                <div className="create-dropdown-header">
                  <FaFileAlt className="file-icon" />
                  <span className="certificate-text">Certificate</span>
                </div>
                <div className="create-dropdown-description">
                  Choose a template, create a certificate and manage ownership
                  and validity
                </div>
              </div>
            )}
          </button>
        </div>
        <div className="home">
          <FaHome className="icon" /> Home
        </div>
      </div>
      <div className="main-content">
        {/* Rest of the code remains the same */}        
        <div className="search-bar">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search Document or Folder" />
          </div>
          <div className="user-info">
            <div className="metamask-logo-container">
              <img
                src={metamaskLogo}
                alt="MetaMask Logo"
                className="metamask-logo"
              />
            </div>
            <div className="profile-image-container" onClick={toggleUserDropdown}>
              <img
                src={userProfileImage}
                alt="User Profile"
                className="profile-image"
              />
              <span className="username">Username</span>
              {showUserDropdown && (
                <div className="user-dropdown">
                  <div className="user-dropdown-content">
                    <FaCog className="settings-icon" />
                    <span>Settings</span>
                  </div>
                </div>
              )}
            </div>
            <div className="logout-icon-container">
              <FaSignOutAlt />
            </div>
          </div>
        </div>
        {/* Rest of the code remains the same */}
        <Card>
          <CardContent>
            <div className="documents-header">
              <Typography variant="h5" component="div">
                Documents
              </Typography>
            </div>
            <div className="documents-table">
              <div className="table-header">
                <div>Name</div>
                <div>Status</div>
                <div>Author</div>
                <div>Update date</div>
                <div>View</div>
                <div>Upload</div>
                <div>Actions</div>
              </div>
              <div className="document-wrapper">
                <div className="no-documents-text">NO DOCUMENTS</div>
                <button className="add-new-btn">
                  Add New
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
