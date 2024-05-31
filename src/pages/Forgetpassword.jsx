import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png"; // Assuming logo.png is in the correct path
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import LoadingAnimation from "../component/LoadingAnimation"; // import loading

function ForgotPassword() {
  const [input, setInput] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendOTp = async (event) => {
    event.preventDefault();
    console.log("Email for OTP:", input);

    setIsLoading(true);
    fetch(`https://prj-certifi-backend.onrender.com/api/auth/sendOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Update certificates state with fetched data
          Toastify({
            text: "OTP sent successful!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            stopOnFocus: true,
          }).showToast();
          localStorage.setItem("email", input);
          setIsOtpSent(true);
          setIsLoading(false);
        } else {
          Toastify({
            text: "OTP sending failed!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            stopOnFocus: true,
          }).showToast();
          setIsOtpSent(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        Toastify({
          text: "An error occurred while fetching certificates. Please try again.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
        }).showToast();
        setIsOtpSent(false);
      });
  };

  const confirmOtp = (event) => {
    event.preventDefault();
    const email = localStorage.getItem("email");

    const otpValue = input;
    console.log("sdfds", email, otpValue);
    // Validate OTP (you would typically call your backend API here)
    fetch("https://prj-certifi-backend.onrender.com/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
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
          navigate("/ForgotPasswordChange");
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
  };

  return isLoading === true ? (
    <LoadingAnimation />
  ) : (
    <div className="flex justify-center items-center flex-col">
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
        <p>
          Remember Password?{" "}
          <Link
            to={"/login"}
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            Sign In
          </Link>
        </p>
      </nav>

      <div className="form-container  xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Forgot Password</p>
        <form
          // onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          <div className="w-full">
            {isOtpSent == false ? (
              <input
                type="email"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 border-2  w-full rounded-md px-2"
              />
            ) : (
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter the OTP"
                className="h-12 border-2  w-full rounded-md px-2"
              />
            )}
          </div>

          {isOtpSent && (
            <p className="text-sm text-gray-600">
              Didn't get the OTP?{" "}
              <button
                type="submit"
                onClick={sendOTp}
                className="text-blue-500 underline"
              >
                Resend
              </button>
            </p>
          )}

          <div className="w-full flex item-center justify-center">
            {isOtpSent == false ? (
              <Link onClick={sendOTp} className="w-[400px flex">
                <button className="loginBut w-[400px] ">
                  <span>Send OTP</span>
                </button>
              </Link>
            ) : (
              <Link onClick={confirmOtp} className="w-[400px flex">
                <button className="loginBut w-[400px] ">
                  <span>Confirm OTP</span>
                </button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
