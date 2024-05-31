import React from "react";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Function to scroll to a specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };

  return (
    <div
      className="px-16 py-4 flex w-full justify-between items-center"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="absolute inset-0 bg-[#D9D9D9] opacity-[45%] backdrop-blur-sm" />{" "}
      {/* Background element */}
      <div className="relative">
        <Link to={"/"}>
          <img src={logo} className="pb-2" alt="" />
        </Link>
      </div>
      <div className="flex gap-20 text-base pr-10">
     
        <button
          className="smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-[2px] after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#000000] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-[black]"
          onClick={() => scrollToSection("validate")}
        >
          Validate
        </button>
        <button
          className="smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-[2px] after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#000000] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-[black]"
          onClick={() => scrollToSection("aboutus")}
        >
          About Us
        </button>
        <button
          className="smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-[2px] after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#000000] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-[black]"
          onClick={() => scrollToSection("members")}
        >
         Members
        </button>
        <Link to="/userchoice" className="uppercase ">
          {" "}
          <button className="loginBut w-[120px]">
            <span>Login</span>
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
