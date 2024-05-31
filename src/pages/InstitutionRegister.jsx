import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import { useNavigate } from "react-router-dom";

// Function to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Function to validate password strength (example, adjust as needed)
const validatePassword = (password) => {
  // Check for minimum length, uppercase, lowercase, number, and special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

function InstitutionRegistration() {
  // State variables
  const [instituteType, setInstituteType] = useState("");
  // const [instituteLocation, setInstituteLocation] = useState("");
  const [companyName, setCompanyName] = useState(""); // State for company name
  const [instituteLocation, setLocation] = useState(""); // State for location
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();
  // Example list of institution types (replace with your actual data)
  const instituteTypes = ["University", "College", "High School", "Company", "Other"];

  // State for the search terms
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearchTerm, setLocationSearchTerm] = useState("");

  // Example list of locations (replace with your actual data or fetch from an API)
  const locations = [
    { name: "Thimphu" },
    { name: "Punakha" },
    { name: "Wangdue" },
    // ... add more locations
  ];

  // Filter institute types based on search term
  const filteredInstituteTypes = instituteTypes.filter((type) =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter locations based on search term
  const filteredLocations = locations.filter((instituteLocation) =>
    instituteLocation.name.toLowerCase().includes(locationSearchTerm.toLowerCase())
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    document.cookie = `InsEmail=${email}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;

    // Validation (include companyName and location)
    if (
      !instituteType ||
      !instituteLocation ||
      !companyName || // Check if company name is filled
      !location || // Check if location is filled
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // ... (rest of the validation and submission logic)
    fetch("https://prj-certifi-backend.onrender.com/api/institute/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        email,
        instituteType,
        instituteLocation, 
        password
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Registration successful!");
          setCompanyName("");
          setLocation("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          navigate("/InsOtpVer")

        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Navigation bar - same as URegister */}
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

      {/* Registration form container - same as URegister */}
      <div className="form-container w-[50vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-3xl pb-4">Create your institution Account</p>
        <p className="text-center text-lg pb-16">Join our network , start issuing and validating certificates on the <br /> Blockchain today</p>

        {/* Form with Tailwind CSS classes */}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          {/* Company Name input - similar to Institute Type */}
          <div className="w-full">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
            />
          </div>
          <div className="flex gap-6 w-full">
            {/* Institute Type input with search and dropdown */}
            <div className="w-full relative">
              <input
                type="text"
                value={instituteType}
                onChange={(e) => {
                  setInstituteType(e.target.value);
                  setSearchTerm(e.target.value); // Update search term
                }}
                placeholder="Select your institute type"
                className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
              />
              {searchTerm && (
                <ul className="absolute top-full left-0 bg-white w-full shadow-md rounded-md mt-2">
                  {filteredInstituteTypes.map((type) => (
                    <li
                      key={type}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setInstituteType(type);
                        setSearchTerm(""); // Clear search term on selection
                      }}
                    >
                      {type}
                    </li>
                  ))}
                  {/* Show "No results" if no matches */}
                  {filteredInstituteTypes.length === 0 && (
                    <li className="px-3 py-2 text-gray-500">No results</li>
                  )}
                </ul>
              )}
            </div>
            <div className="w-full relative">
            <input
              type="text"
              value={instituteLocation}
              onChange={(e) => {
                setLocation(e.target.value);
                setLocationSearchTerm(e.target.value); // Update location search term
              }}
              placeholder="Select your location"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
            />
            {locationSearchTerm && (
              <ul className="absolute top-full left-0 bg-white w-full shadow-md rounded-md mt-2">
                {filteredLocations.map((loc) => (
                  <li
                    key={loc.name}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setLocation(loc.name);
                      setLocationSearchTerm(""); // Clear search term on selection
                    }}
                  >
                    {loc.name}
                  </li>
                ))}
                {/* Show "No results" if no matches */}
                {filteredLocations.length === 0 && (
                  <li className="px-3 py-2 text-gray-500">No results</li>
                )}
              </ul>
            )}
          </div>

          </div>


          

          {/* Email input - same as URegister */}
          <div className="w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
            />
          </div>

          {/* Password input - same as URegister */}
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
            />
          </div>

          {/* Confirm Password input - same as URegister */}
          <div className="w-full pb-10">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-3"
            />
          </div>

          {/* Submit button - same as URegister */}
          <button
            type="submit"
            className="w-full bg-[#8000FF] h-14 rounded-md shadow-xl text-white text-xl hover:bg-[#5808a8] hover:transition-all hover:duration-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default InstitutionRegistration;