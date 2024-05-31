import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../component/LoadingAnimation";

function URegister() {
  // Define state variables for registration inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    document.cookie = `email=${email}; expires=${new Date(
      Date.now() + 86400000
    ).toUTCString()}; path=/`;

    // Basic validation (add more as needed)
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setIsLoading(true);

    // TODO: Call backend API for registration
    fetch("https://prj-certifi-backend.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Registration successful!");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsLoading(false);
          localStorage.setItem("email", email);
          
          navigate("/OtpEnter");
        } else {
          alert("Registration failed. Please try again.");
          setIsLoading(false);
        }
      })
      .catch((error) => console.error("Error:", error));

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Clear form fields after submission
  };

  return isLoading === true ? (
    <LoadingAnimation />
  ) : (
    <div className="flex justify-center items-center flex-col">
      {/* Navigation bar - similar to login page */}
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            Sign In
          </Link>
        </p>
      </nav>

      {/* Registration form container */}
      <div className="form-container  xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Sign Up</p>

        {/* Form with Tailwind CSS classes */}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          {/* Name input */}
          <div className="w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>

          {/* Email input - similar to login page */}
          <div className="w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>

          {/* Password input - similar to login page */}
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>

          {/* Confirm Password input */}
          <div className="w-full pb-10">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>

          {/* Submit button - similar to login page */}
          <button type="submit" className="loginBut w-[400px] ">
            <span>Sign Up</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default URegister;
