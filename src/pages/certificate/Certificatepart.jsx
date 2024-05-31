import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import "../../css/index.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import LoadingAnimation from "../../component/LoadingAnimation"; // import loading

const CertificatePart = () => {
  const navigate = useNavigate();
  const certId = window.localStorage.getItem("certId");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    // console.log(signer.email)
    const formData = new FormData();

    formData.append("image", image);
    formData.append("signer", signer.email);
    console.log("formaData", image);
    setIsLoading(true);

    fetch(
      `https://prj-certifi-backend.onrender.com/api/certificate/addSigner/${certId}`,
      {
        method: "PATCH",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("documentId", certId);
          Toastify({
            text: "Certificate creation successful!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            stopOnFocus: true,
          }).showToast();
          setIsLoading(false);

          navigate("/dashboard");
        } else {
          Toastify({
            text: "Certificate creation failed.!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            stopOnFocus: true,
          }).showToast();
          setIsLoading(false);
          navigate("/dashboard");
        }
      });
  };

  const [image, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [signer, setSigner] = useState(null);
  const [availableSigners, setAvailableSigners] = useState([]);
  const previewRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("documentId")) {
      localStorage.removeItem("documentId"); // Replace 'yourItemKey' with the actual key you want to remove
    }

    // Fetch certificates from backend API
    fetch("https://prj-certifi-backend.onrender.com/api/institute/getAllins", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Update certificates state with fetched data
          setAvailableSigners(data.data);
        } else {
          alert("Signer data fetch failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
        alert(
          "An error occurred while fetching certificates. Please try again."
        );
      });
  }, []);

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setSelectedFile(image);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(image);
    console.log("formaData", image);
  };

  const handleChooseSigner = (signerEmail) => {
    const selectedSigner = availableSigners.find(
      (s) => s.email === signerEmail
    );
    setSigner(selectedSigner);
  };

  const handleRemoveSigner = () => {
    setSigner(null);
  };

  const togglePreview = () => {
    if (previewRef.current) {
      previewRef.current.classList.toggle("hidden");
    }
  };

  return isLoading === true ? (
    <LoadingAnimation />
  ) : (
    <div className="flex justify-center items-center flex-col">
      {/* Navigation */}
      <nav className="w-full pt-12 pb-20 px-52">
        <Link to={"/cform"} className="">
          <img src={logo} alt="" />
        </Link>
      </nav>

      <div className="form-container w-[90vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32 border-2 border-gray-400 rounded-lg">
        {/* Upload Certificate Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="w-2/4">
            <label
              className="block text-gray-700 font-bold mb-2 text-xl"
              htmlFor="certificate"
            >
              Upload the physical certificate
            </label>
            <p className="text-gray-500 text-sm">
              Drag and drop a file or select an image from your PC
            </p>
          </div>
          <div className="w-2/4 relative">
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              id="certificate"
              type="file"
              onChange={handleFileChange}
            />
            {image && (
              <div className="mt-2 flex gap-6 ">
                <p className="text-sm pt-4">Selected file: {image.name}</p>
                <div
                  className="w-10 h-10 rounded-full overflow-hidden inline-block mt-2 cursor-pointer"
                  onClick={togglePreview}
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  ref={previewRef}
                  className="hidden absolute top-16 right-0 z-10 bg-white border rounded-md shadow-md p-4"
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-400 w-[100%]" />

        {/* Signer Section */}
        <div className="flex items-center justify-between mt-8">
          <div className="w-2/5">
            <label
              className="block text-gray-700 font-bold mb-2 text-xl"
              htmlFor="signer"
            >
              Signer
            </label>
            <p className="text-gray-500 text-sm mb-2">
              People who are required to sign the document so that they can
              verify your certificate for validation
            </p>
          </div>
          <div className="w-2/4">
            {signer ? (
              <div className="flex items-center justify-between mb-2 border border-[black] px-6 py-4 rounded-md">
                <div className="flex items-left">
                  <div className="w-8 h-8 bg-gray-400 rounded-full mr-2 text-white font-bold flex items-center justify-center">
                    {signer.name.charAt(0).toUpperCase()}
                  </div>
                  <span>
                    {signer.name} ({signer.email})
                  </span>
                </div>
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={handleRemoveSigner}
                >
                  ×
                </button>
              </div>
            ) : (
              <div>
                Choose a signer:
                {availableSigners.map((s) => (
                  <button
                    key={s.email}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700 w-full text-center"
                    onClick={() => handleChooseSigner(s.email)}
                  >
                    {s.name} ({s.email})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center flex-col gap-4 mt-12">
        {/* <Link to="/cvalid"> */}
        <button
          type="submit"
          className="loginBut w-[400px] "
          onClick={handleButtonClick}
        >
          <span>Add document</span>
        </button>
        {/* </Link> */}
        <button className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CertificatePart;
