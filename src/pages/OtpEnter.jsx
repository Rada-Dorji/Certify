import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import LoadingAnimation from "../component/LoadingAnimation";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

const userEmail = localStorage.getItem("email");

function OtpEntry() {
  const [otps, setOtp] = useState(new Array(6).fill(""));

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otps.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  // setIsLoading(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const otpValue = otps.join("");
    // Validate OTP (you would typically call your backend API here)
    fetch("https://prj-certifi-backend.onrender.com/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        otp: otpValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Verified") {
          Toastify({
            text: "OTP verification successful!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            stopOnFocus: true,
          }).showToast();

          setIsLoading(false);
          navigate("/login");
        } else {
          Toastify({
            text: "OTP verification failed. Please try again.!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            stopOnFocus: true,
          }).showToast();
          setIsLoading(false);
        }
      });
    console.log("Entered OTP:", otpValue);
    // For demonstration, we'll navigate to the password change page isLoading === true ? (
    //   <LoadingAnimation />
    // ) :
    // In a real application, you would verify the OTP first
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Navigation (same as ForgotPassword) */}
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
        {/* You might want to adjust the link here */}
        <p>
          Back to Login?{" "}
          <Link
            to={"/login"}
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            Sign In
          </Link>
        </p>
      </nav>
      <div className="form-container  xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-5">Email Verification </p>
        <p className="text-center text-lg pb-12">
          We have sent a 6-digit verification code to your email
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          <div className="flex w-full justify-between pb-10">
            {otps.map((data, index) => {
              return (
                <input
                  className="m-2 border  rounded  h-20 w-14 text-center text-xl "
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>

          <button type="submit" className="loginBut w-[400px] ">
            <span>Verify OTP</span>
          </button>

          <div className="">
            <Link
              to={"/userchoice"}
              className="pt-4 text-sm hover:text-blue-500 hover:transition-all hover:duration-300"
            >
              Resend OTP
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpEntry;
