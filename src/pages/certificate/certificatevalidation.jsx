import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../public/background.jpeg";
import Modal from "react-modal";
import axios from "axios";
import LoadingAnimation from "../../component/LoadingAnimation";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function CertificateValidation() {
  const [activeTab, setActiveTab] = useState("recipients");
  const [userType, setuserType] = useState(true);
  const navigate = useNavigate();

  // const crtId = window.localStorage.getItem("certId");
  const [fetchedData, setFetchedData] = useState(null); // State to store fetched data
  const [recipients, setRecipients] = useState([]);
  // State for certificate information (replace with your actual data or fetching mechanism)
  const [certificateInfo, setCertificateInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // document approval
  // const [certificates, setCertificates] = useState([]); // State to store fetched certificates
  const [currentVerifyCertificateId, setCurrentVerifyCertificateId] =
    useState(null);
  const [currentNotValidCertificateId, setCurrentNotValidCertificateId] =
    useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const documentId = localStorage.getItem("documentId");
        console.log(documentId);
        const response = await fetch(
          `https://prj-certifi-backend.onrender.com/api/certificate/getCertificatebyId/${documentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setFetchedData(data.data); // Set fetched data in state
          setIsLoading(false);
        } else {
          throw new Error("Certificate data fetch failed. Please try again.");
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const email = localStorage.getItem("email");

    // Fetch certificates from backend API
    fetch(
      `https://prj-certifi-backend.onrender.com/api/auth/getuserbyemail/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          // Update certificates state with fetched data
          setuserType(false);
          console.log("User type updated to false");
        } else {
          // Handle case where data.status is not success
          setuserType(true);
          console.log(
            "User type set to true due to data.status not being success"
          );
        }
      })
      .catch((error) => {
        setuserType(true);
        console.error("Error fetching user data:", error);
      });
  }, []); // Corrected dependency array

  useEffect(() => {
    console.log("User type changed:", userType);
  }, [userType]);

  // verify modal
  const [verifyModalIsOpen, setVerifyModalIsOpen] = useState(false);

  const openVerifyModal = () => {
    setCurrentVerifyCertificateId();
    // handleVerify();
    setVerifyModalIsOpen(true);
  };

  const closeVerifyModal = () => {
    setVerifyModalIsOpen(false);
    // handleNotValid(certificateId);
  };

  const handleVerify = async (certificateId) => {
    console.log("certi", certificateId);
    const imageUrl = certificateInfo.image;
    console.log(imageUrl);

    try {
      // Fetch the image as a Blob
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const imageBlob = await response.blob();

      // Create FormData object to send the image
      const formDataForUpload = new FormData();
      formDataForUpload.append("file", imageBlob, "image.png");

      // Make the API request to Pinata to upload the image
      setIsLoading(true);

      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formDataForUpload,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": `multipart/form-data`,
        },
      });

      const ipfsHash = responseData.data.IpfsHash;
      console.log(ipfsHash);
      if (!ipfsHash) {
        throw new Error("Uploading to IPFS failed!");
      }

      // Optional: Verify the uploaded content is accessible via IPFS gateway
      const ipfsGatewayUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      const ipfsResponse = await fetch(ipfsGatewayUrl);
      if (!ipfsResponse.ok) {
        throw new Error("Uploaded content is not accessible via IPFS gateway");
      }
      console.log(ipfsGatewayUrl);
      setIsLoading(false);

      // Make API request to your backend to verify the certificate
      const verifyResponse = await fetch(
        `https://prj-certifi-backend.onrender.com/api/certificate/verify/${certificateId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ipfsHash }),
        }
      );

      const data = await verifyResponse.json();
      if (data.status === "success") {
        console.log(data.data);
        Toastify({
          text: "Certificate verified successfully!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
        }).showToast();
        navigate("/institutiondashboard");
      } else {
        console.log(data);
        Toastify({
          text: "Certificate verification failed!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
        }).showToast();
        navigate("/institutiondashboard");
      }
    } catch (error) {
      console.error(error);
      Toastify({
        text: "An error occurred during verification!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
        stopOnFocus: true,
      }).showToast();
    } finally {
      setIsLoading(false);
      closeVerifyModal();
    }
  };

  const handleNotValid = (certificateId) => {
    setIsLoading(true);

    fetch(
      `https://prj-certifi-backend.onrender.com/api/certificate/notverify/${certificateId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data.data);
          Toastify({
            text: "Certificate declined!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            stopOnFocus: true,
          }).showToast();
          setIsLoading(false);
          // console.log("Validated");
          closenotValidModal();
        }
      });
  };

  // notvalid modal
  const [notValidModalIsOpen, setnotValidModalIsOpen] = useState(false);

  const opennotValidModal = (certificateId) => {
    setCurrentNotValidCertificateId(certificateId);
    setnotValidModalIsOpen(true);
  };

  const closenotValidModal = () => {
    setnotValidModalIsOpen(false);
  };

  // Update recipients when fetchedData changes
  useEffect(() => {
    if (fetchedData) {
      setRecipients([
        { name: "Author Name ", mail: fetchedData.email, role: "Author (You)" },
        { name: "Signer Name", mail: fetchedData.signer, role: "Signer" },
      ]);
      setCertificateInfo({
        // Update certificate information
        certificateName: fetchedData.courseName,
        createdOn: new Date().toLocaleDateString("en-US", {
          // Automatic today's date
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        documentId: fetchedData._id,
        image: fetchedData.image,
      });
    }
  }, [fetchedData]);

  // Use fetchedData directly or fallback to empty strings if fetchedData is null
  const authorMail = fetchedData?.email || "";
  const authorName = fetchedData?.name || "";
  const signerMail = fetchedData?.signer || "";
  const courseName = fetchedData?.courseName || "";
  const courseDuration = fetchedData?.coursePeriod || "";
  const courseDetails = fetchedData?.courseDetails || "";
  const issueDate = fetchedData?.createdAt || "";
  const ID = fetchedData?.cid || "";
  const certId = fetchedData?._id || "";
  const documentId = fetchedData?.documentIdentification || "";
  const documentVerified = fetchedData?.verified || "";
  const image = fetchedData?.image || "";

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  };

  const documentIdRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyDocumentId = () => {
    const documentIdText = documentIdRef.current.textContent;
    navigator.clipboard
      .writeText(documentIdText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); // Hide message after 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy document ID:", error);
        // Handle error (e.g., show an error message)
        alert("Error copying document ID. Please try again.");
      });
  };

  // State for valid badge color and text
  const [validStatus, setValidStatus] = useState({
    text: "Document pending",
    color: "#eaad7b", // Initial color: orange for pending
  });

  // Function to update the badge color and text based on validation logic
  const updateBadgeStatus = () => {
    // Example validation: Check if document ID is a number and has 10 digits
    const isValidDocumentId =
      !isNaN(certificateInfo.documentId) &&
      certificateInfo.documentId.toString().length === 10;

    // Update badge status based on validation result
    if (isValidDocumentId) {
      setValidStatus({ text: "Document valid", color: "#80FF00" }); // Green for valid
    } else {
      setValidStatus({ text: "Document not valid", color: "#FF0000" }); // Red for invalid
    }
  };

  // useEffect to update the badge status when necessary
  useEffect(() => {
    updateBadgeStatus();
  }, [certificateInfo.documentId]); // Update when documentId changes

  // Add event handlers for Accept and Reject buttons
  const handleAccept = () => {
    // Add your logic for accepting the certificate here
    openVerifyModal();
    console.log("Certificate accepted");
  };

  const handleReject = () => {
    // Add your logic for rejecting the certificate here
    console.log("Certificate rejected");
  };

  return isLoading === true ? (
    <LoadingAnimation />
  ) : (
    <div className="flex h-full bg-gray-100 ">
      <nav className="w-full flex justify-between pl-20 pb-5 fixed top-0 left-0">
        <p className="">
          <Link to={"/dashboard"} className="pl-4 ">
            <img src={logo} alt="" />
          </Link>
        </p>
      </nav>
      <div className="certificate flex flex-col items-center bg-gray-100 p-8 pt-32 rounded-lg w-[70%]">
        {/* Certificate Content */}
        <div
          className="w-8/12  p-8 bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="p-10 text-center flex flex-col">
            <h1 className="text-4xl text-center pt-28 uppercase">
              Certificate of completion
            </h1>
            <h2 className="text-center pt-2">Awarded to</h2>
            <p className="text-4xl text-center py-4 uppercase">{authorName}</p>
            <p className="text-center">For completing the course</p>
            <p className="text-3xl text-center py-6">{courseName}</p>
            <div className="flex justify-center pt-40 gap-2">
              <p>Course duration:</p>
              <p>{courseDuration}</p>
            </div>
            <div className="flex justify-center pt-2 gap-2">
              <p>Course detail:</p>
              <p>{courseDetails}</p>
            </div>
            <div className="flex justify-center pt-2 gap-2">
              <p>ID :</p>
              <p>{ID}</p>
            </div>
            <div className="flex justify-center pt-2 gap-2">
              <p>Issue date :</p>
              <p>{issueDate}</p>
            </div>
          </div>
        </div>

        {/* File Retrieval Area */}
        <div className=" p-8  rounded-lg">
          <img src={image} className="p-8  rounded-lg " />
        </div>
      </div>
      {/* Document Overview and Tabs */}
      <div className="w-[30%]  bg-white p-10">
        <h1 className="text-xl font-bold mb-4">Document overview</h1>
        <p className="text-gray-600 ">
          The details and the information regarding the document that you have
          created is shown
        </p>
        <div className="py-5">
          {/* Valid badge with dynamic color and text */}
          <div
            className={`bg-[${validStatus.color}] text-[black] text-bg font-medium px-4 py-5 rounded text-center`}
          >
            {validStatus.text}
          </div>
        </div>
        <div className="flex justify-between ">
          <button
            className={`border border-[black] w-[45%] px-4 py-2 rounded font-medium ${
              activeTab === "recipients"
                ? "bg-[#8000FF] text-white"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("recipients")}
          >
            Recipients
          </button>
          <button
            className={` border border-[black] w-[45%] px-4 py-2 rounded font-medium ${
              activeTab === "information"
                ? "bg-[#8000FF] text-white"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("information")}
          >
            Information
          </button>
        </div>

        {/* Recipients Tab */}
        {activeTab === "recipients" && (
          <div className="mt-4">
            <div>
              {recipients.map((recipient) => (
                <div key={recipient.mail}>
                  <h1 className=" text-lg pb-2">{recipient.role}</h1>
                  <p className="pb-2 font-bold">
                    {recipient.mail} ({recipient.role})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Tab */}
        {activeTab === "information" && (
          <div className="mt-4">
            <p>Certificate </p>
            <p className="font-bold pb-3">{certificateInfo.certificateName}</p>

            <div>
              <p>Created on</p>
              <p className="font-bold pb-3">{certificateInfo.createdOn}</p>
            </div>

            <p>Document identification</p>
            {/* Added flex container */}
            <div className="flex items-center relative">
              {" "}
              {/* Add relative positioning */}
              <p ref={documentIdRef} className="font-bold pb-3 pr-6">
                {certificateInfo.documentId}
              </p>
              {/* Added copy button */}
              <button
                class="cursor-pointer uppercase bg-white px-4 py-2  mt-5 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#00ff22,-0.5rem_-0.5rem_#ff0000] transition "
                onClick={handleCopyDocumentId}
              >
                Copy
              </button>
              {/* Momentary Message */}
              {copySuccess && (
                <span className="absolute top-[-30px] left-[300px] text-sm text-[black]">
                  Copied!
                </span>
              )}
            </div>
          </div>
        )}

        {/* verify Modal */}
        <Modal
          isOpen={verifyModalIsOpen}
          onRequestClose={closeVerifyModal}
          contentLabel="Verify Account Modal"
          className="modal-overlay"
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Status validation </h2>
            </div>
            <p className="modal-message">
              Are you sure this document is valid?
            </p>
            <div className="modal-buttons">
              <button
                className="modal-button verify"
                onClick={() => handleVerify(certId)}
              >
                Approve
              </button>
              <button
                className="modal-button cancel"
                onClick={closeVerifyModal}
              >
                Back
              </button>
            </div>
          </div>
        </Modal>

        {/* not validated modal */}
        <Modal
          isOpen={notValidModalIsOpen}
          onRequestClose={closenotValidModal}
          contentLabel="Verify Account Modal"
          className="modal-overlay"
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Status validation </h2>
            </div>
            <p className="modal-message">
              Are you sure this document is not valid?
            </p>
            <div className="modal-buttons">
              <button
                className="modal-button not-valid"
                onClick={() => handleNotValid(certId)}
              >
                Reject
              </button>
              <button
                className="modal-button cancel"
                onClick={closenotValidModal}
              >
                Back
              </button>
            </div>
          </div>
        </Modal>

        {/* Conditionally render the actions section based on userType */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Document Approval</h2>
          {userType == true ? (
            <div className="flex justify-between">
              {documentVerified == "pending" ? (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-[45%]"
                    onClick={handleAccept}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-[45%]"
                    onClick={handleReject}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <>
                  {documentVerified == "true" ? (
                    <button
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded w-[100%]"
                      disabled
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded w-[100%]"
                      disabled
                    >
                      Rejected
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="flex justify-between">
              {documentVerified == "pending" ? (
                <>
                  <button
                    className="bg-[orange] text-white font-bold py-2 px-4 rounded w-[45%]"
                    // onClick={handleAccept}
                  >
                    Pending
                  </button>
                </>
              ) : (
                <>
                  {documentVerified == "true" ? (
                    <button
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded w-[100%]"
                      disabled
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded w-[100%]"
                      disabled
                    >
                      Rejected
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificateValidation;
