import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import { useNavigate } from "react-router-dom";
import "../css/index.css";
import LoadingAnimation from "./LoadingAnimation";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function InsLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Email", email);
    console.log("Password", password);

    if (!password || !email) {
      alert("All fields are required");
    } else {
      setIsLoading(true);
      fetch("https://prj-certifi-backend.onrender.com/api/institute/login", {
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
            console.log(data.data);
            window.localStorage.setItem("email", email);
            localStorage.setItem("userid", data.data._id);
            localStorage.setItem("insLoggedIn", "true");
            alert("Login successful!");

            // alert("Login successful!");
            Toastify({
              text: "Login successful!",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "green",
              stopOnFocus: true,
            }).showToast();
            setEmail("");
            setPassword("");
            setIsLoading(false);

            navigate("/Institutiondashboard");
          } else {
            // alert("Login successful!");
            setIsLoading(false);

            Toastify({
              text: "Login failed. Please try again!",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "green",
              stopOnFocus: true,
            }).showToast();
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
      <nav className=" w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
      </nav>

      <div className="form-container xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Log In</p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          <div className="w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Institute Email Address"
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

              <Link to={"/ForgotInsPassword"}>
                <p className="pl-4 text-sm hover:text-blue-500  hover:duration-300">
                  Forgot Password?
                </p>
              </Link>
            </div>
          </div>
          <div className="w-full  flex justify-center">
            <button type="submit" className="loginBut w-[400px] ">
              <span>Log In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InsLogin;
