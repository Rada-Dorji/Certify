import React from "react";
import "../css/certificateofcompletion.css";
import logoImage from "../assets/certifi-logo.png"; // Replace with your logo file path
import { FaDownload } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.css";

const CertificateOfCompletion = () => {
  return (
    <div className="container-wrapper">
      <div className="header">
        <img src={logoImage} alt="Logo" className="logo" />
        <FaDownload className="download-icon" />
      </div>
      <div className="certificate-container">
        <div className="certificate">
          <h1>CERTIFICATE OF COMPLETION</h1>
          <p>Awarded to</p>
          <h2>personName</h2>
          <p>For completing the course</p>
          <h3>courseName</h3>
          <p>Course duration: courseHours</p>
          <p>Course details: courseDetails</p>
          <p>Valid since: certificationDate</p>
        </div>
        <div className="document-overview">
          <h2>Document overview</h2>
          <p>
            The details and the information regarding the document that you have
            created is shown
          </p>
          <button>Document valid</button>
          <button>Recipients</button>
          <button>Information</button>
          <div className="certificate-info">
            <h3>Certificate</h3>
            <p>Certificate name</p>
            <p>Created on: yyy-mm-dd</p>
            <p>Expires on: yyy-mm-dd</p>
            <p>Issued by: something@email.com</p>
            <p>Document identification: 76417d18d780-324328d3-230064d0873</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateOfCompletion;
