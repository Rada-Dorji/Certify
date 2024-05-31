import React from "react";
import "../css/addinstitution.css"

const InstitutionModal = () => {
    return (
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <h2>Add Institution</h2>
          {/* Add your form fields here */}
          <input type="text" placeholder="Company Name" />
          <input type="text" placeholder="Institution Type" />
          <input type="text" placeholder="Location" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </div>
      </div>
    );
  };

  export default InstitutionModal;