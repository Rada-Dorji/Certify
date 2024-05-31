import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

function ChangePassword() {
  // State variables for new password, confirmation, and email
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation (you'll likely want more robust checks)
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // TODO: Call your backend API to update the password
    // You'll likely send the email and newPassword
    console.log("Email:", email);
    console.log("New Password:", newPassword);

    // Clear form fields after submission
    setNewPassword("");
    setConfirmPassword("");
    setEmail("");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Navigation (same as previous components) */}
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

      <div className="form-container w-[50vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Change Password</p>
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-full gap-6">
          <div className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
            />
          </div>
          <div className="w-full pb-6">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#8000FF] h-14 rounded-md shadow-xl text-white text-xl hover:bg-[#5808a8] hover:transition-all hover:duration-500"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;