import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import "../css/index.css";
import LoadingAnimation from "./LoadingAnimation";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password || !email) {
      alert("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://prj-certifi-backend.onrender.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "Success") {
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("adminLoggedIn", "true")

        setEmail("");
        setPassword("");
        Toastify({
          text: "Login successful!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
        }).showToast();
        navigate("/admindashboard");
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
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      Toastify({
        text: "Login failed. Please try again!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
        stopOnFocus: true,
      }).showToast();
    } finally {
      Toastify({
        text: "Login failed. Please try again!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
        stopOnFocus: true,
      }).showToast();
      setIsLoading(false);
    }
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <div className="flex justify-center items-center flex-col">
      <nav className=" w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="Logo" />
      </nav>

      <div className="form-container xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Admin</p>
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
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                  </label>
                </div>
                <p>Remember Me</p>
              </div>

              <Link to={"/Forgotpassword"}>
                <p className="pl-4 text-sm hover:text-blue-500  hover:duration-300">
                  Forgot Password?
                </p>
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="loginBut w-[400px]">
              <span>Log In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
