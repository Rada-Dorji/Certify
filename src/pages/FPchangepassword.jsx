import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import "../css/index.css";
import LoadingAnimation from "../component/LoadingAnimation"; // import loading
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function ForgotPasswordchange() {
  // Define state variables for form inputs
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const changePassword = (event) => {
    event.preventDefault();

    console.log("Password", newPassword);
    const email = localStorage.getItem("email");

    if (!newPassword) {
      alert("All fields are required");
    } else {
      setIsLoading(true); // is loading

      fetch(
        "https://prj-certifi-backend.onrender.com/api/auth/ChangePassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            Toastify({
              text: "Password change successful!",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "green",
              stopOnFocus: true,
            }).showToast();

            localStorage.removeItem("email");
            setPassword("");
            setIsLoading(false); //loading
            navigate("/login");
          } else {
            Toastify({
              text: "Password change failed. Please try again.",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "green",
              stopOnFocus: true,
            }).showToast();
            localStorage.removeItem("email");

            setIsLoading(false); //loading

            console.log(data);
          }
        });
    }
  };

  return isLoading === true ? (
    <LoadingAnimation />
  ) : (
    <div className="flex justify-center items-center flex-col">
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="Logo" />
      </nav>

      <div className="form-container  xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12"> Change Password</p>

        <form
          // onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          <div className="w-full">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set Your New Password"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>
          <div className="w-full  flex justify-center ">
            <button
              // type="submit"
              className="loginBut w-[400px] "
              onClick={changePassword}
            >
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordchange;
