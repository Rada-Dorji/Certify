import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import "../css/index.css";
import LoadingAnimation from "./LoadingAnimation"; // import loading
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Login() {
  // Define state variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Add rememberMe state
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Email", email);
    console.log("Password", password);

    if (!password || !email) {
      alert("All fields are required");
    } else {
      setIsLoading(true); // is loading

      fetch("https://prj-certifi-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "Success") {
            // alert("Login successful!");
            if (rememberMe) {
              // Store email in local storage
              window.localStorage.setItem("email", email);
            } else {
              // Clear email from local storage if rememberMe is unchecked
              window.localStorage.removeItem("email");
            }
            setEmail("");
            setPassword("");
            localStorage.setItem("email", email);
            localStorage.setItem("userLoggedIn", "true");

            setIsLoading(false); //loading
            Toastify({
              text: "Login successful!",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "green",
              stopOnFocus: true,
            }).showToast();
            navigate("/dashboard");
          } else {
            Toastify({
              text: "Login failed. Please try again!",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "green",
              stopOnFocus: true,
            }).showToast();
            setIsLoading(false); //loading
          }
        });
    }
  };
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return isLoading === true ? (
    <LoadingAnimation />
  ) : (
    <div className="flex justify-center items-center flex-col">
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="Logo" />
        <p>
          Don't have an account?
          <Link
            to={"/uregister"}
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            Sign Up
          </Link>
        </p>
      </nav>

      <div className="form-container  xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12"> Log In</p>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          <div className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User Email Address"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-12 border-2  w-full rounded-md px-2"
            />
            <div className="py-4 flex justify-between">
              <div className="flex justify-center items-center gap-2 text-sm">
                <div className="dark:bg-black/10">
                  <label className="text-white">
                    <input
                      className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
                      type="checkbox"
                      checked={rememberMe} // Set checked state
                      onChange={handleRememberMeChange} // Handle checkbox change
                    />
                  </label>
                </div>
                <p className="">Remember Me</p>
              </div>

              <Link to={"/Forgotpassword"}>
                <p className="pl-4 text-sm hover:text-blue-500  hover:duration-300">
                  Forgot Password?
                </p>
              </Link>
            </div>

            {/* <Link to={"/Forgotpassword"}>
              <p className="pl-4 text-sm hover:text-blue-500  hover:duration-300">
                Forgot Password?
              </p>
            </Link> */}
          </div>
          <div className="w-full  flex justify-center ">
            <button type="submit" className="loginBut w-[400px] ">
              <span>Log In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
