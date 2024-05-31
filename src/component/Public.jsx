import React, { useState, useRef, useEffect } from "react";
import earth from "../../public/earth.png";
import cub from "../../public/cub.png";
import comp from "../../public/comp.png";
import logo from "../../public/logo.png";
import Fend from "../../public/frontend.jpg";
import Bend from "../../public/backend.png";
import Bc from "../../public/blockchain.png";
import Manager from "../../public/manager.jpg";
import { ethers } from "ethers"; //import ethers library
import abi from "../contractJson/Certify.json";
import "../css/index.css";
import { Logo } from "../component/Svgs";
import cube1 from "../../public/cube1.png";
import cube2 from "../../public/cube2.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import LoadingAnimation from "./LoadingAnimation"; // import loading
import backgroundImage from "../../public/background.jpeg";
import CryptoJS from "crypto-js";

const Public = () => {
  const [ID, setID] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const inputRef = useRef(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hashedId, setHashedId] = useState(null);
  const [isCopyPromptVisible, setIsCopyPromptVisible] = useState(false);

  const searchCertificate = async (event) => {
    event.preventDefault();
    // alert("isher");

    const { ethereum } = window;

    if (!ethereum && !ethereum.selectedAddress) {
      alert("Install Metamask and connect account");
      return;
    }

    const contractAddress = "0x17d30d722bD5BB3F5d7362aFA4F648fa446e34A2";
    const contractABI = abi.abi;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      // // Extract address (42 characters)
      // const address = ID.substring(0, 42);

      // Extract identifier (24 characters)
      const identifier = ID.substring(42, 66);

      // // Extract hash (remaining characters)
      // const hash = ID.substring(66);
      // setIsLoading(true);
      // const transaction = await contract.getIPFSHash(address, identifier, hash);

      // console.log("Waiting for transaction...");
      // // alert("reach1");
      // const receipt = await transaction.wait(); // Wait for the transaction to be mined
      // alert("Transaction is Successful!");
      // const event = receipt.events;
      // console.log("Event object:", event);
      // // Access the concatenatedString from the args array
      // const concatenatedString = event[0].args[0];
      // console.log("Concatenated String:", concatenatedString);
      // // alert("Concatenated String: " + concatenatedString);

      // // Set the URL state to the concatenated string
      // setSearchResult(concatenatedString);
      const response = await fetch(
        `https://prj-certifi-backend.onrender.com/api/certificate/getCertificatebyId/${identifier}`,
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
        const newHashedId = CryptoJS.SHA256(ID).toString();
        setHashedId(newHashedId);
        Toastify({
          text: "Transaction Successful!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
        }).showToast();
        setIsLoading(false);
      } else {
        Toastify({
          text: "Transaction faied!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
        }).showToast();
        setFetchedData(null);
        setHashedId(null);
        setIsLoading(false);

        throw new Error("Certificate data fetch failed. Please try again.");
      }
    } catch (error) {
      Toastify({
        text: "Transaction faied!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
        stopOnFocus: true,
      }).showToast();
      setFetchedData(null);
      setHashedId(null);
      setIsLoading(false);
    }
  };
  // copy
  const handleCopy = () => {
    navigator.clipboard
      .writeText(ID)
      .then(() => {
        setIsCopyPromptVisible(true); // Show the prompt
        setTimeout(() => {
          // Hide the prompt after 1 second
          setIsCopyPromptVisible(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        Toastify({
          text: "Failed to copy ID. Please try again.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
          stopOnFocus: true,
        }).showToast();
      });
  };
  // scroll
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };

  const handleInputChange = (event) => {
    setID(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputRef.current === document.activeElement) {
      event.preventDefault(); // Prevent the default form submission
      searchCertificate(event); // Call searchCertificate function with the event
    }
  };

  const handleClearInput = () => {
    setID("");
    inputRef.current.focus();
    setSearchResult("");
  };
  // Back to Top Functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };
  return isLoading === true ? (
    <LoadingAnimation />
  ) : (
    <div className=" ">
     <button
  className="fixed bottom-10 right-10 overflow-hidden w-16 h-16 rounded-full bg-[#000000] border-none cursor-pointer  z-10 group flex items-center justify-center" // Increased size to w-16 h-16
  onClick={scrollToTop}
>
  <svg
    className="w-6 h-6 text-[white] dark:text-[white]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m5 15 7-7 7 7"
    />
  </svg>

  <span 
    className="absolute w-36 h-32 -top-8 -left-2  bg-[#e9e9e9] text-[black]  rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-300 origin-right"
  />

  <span 
    className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" 
  >
    <svg
      className="w-6 h-6 text-[black] dark:text-[black]"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m5 15 7-7 7 7"
      />
    </svg>
  </span> 
</button>

      {/* hero */}
      <div className=" bg-gradient-to-b from-[#ececec] to-[#dfdfdf] h-[900px] backdrop-blur-sm pt-10 overflow-x-hidden">
        <div className="tagline  ">
          <h1 className="text-3xl item-left  translate-y-[150px] translate-x-[300px]">
            Secure and transparent{" "}
          </h1>
        </div>
        <div className="Herobanner flex items-center justify-center ">
          <div class="hero-title flex items-center">
            <img
              src={cube1}
              alt=""
              class="w-[300px] h-[300px] -translate-x-[150px]  "
            />
            <h1 class="text-[11rem] font-bold text-black">CER</h1>
            <img src={cube2} alt="" class="w-[550px] h-[500px] ml-4" />
            <h1 class="text-[11rem] font-bold text-black">TIFI</h1>
            <img
              src={cube1}
              alt=""
              class="w-[350px] h-[350px] translate-x-[200px] -translate-y-[100px]"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={cube1}
            alt=""
            className=" h-[200px] w-[200px] -translate-x-[650px]"
          />
          <h1 className="text-right translate-x-[470px] -translate-y-[200px] text-xl ">
            We will be helping the people eradicate the <br />
            fake forgery of document and certificate <br />
            which we see every where{" "}
          </h1>
          <img
            src={cube1}
            alt=""
            className="h-[200px] w-[200px] -translate-y-[50px] translate-x-[250px]  "
          />
        </div>
      </div>

          <img src={cube1} alt="" className="h-[200px] translate-x-[1600px] translate-y-[100px] " />
      {/* hero end */}
      <div className="relative validate pb-40 pt-12" id="validate">
        <h1 className="text-center font-bold py-10 text-2xl">Validate</h1>
        <h3 className="text-center text-4xl pb-6">
          Protect your documents! Check their integrity and authenticity
        </h3>
        <p className="text-center text-lg pb-10">
          Enter the document ID number or check its authenticity by adding the
          file
        </p>
        {/* search    */}
        <div className="">
        <form
          class="form relative flex justify-center"
          onKeyDown={handleKeyDown}
        >
          {" "}
          {/* Add justify-center */}
          <button class="absolute left-[488px] -translate-y-[45%] top-1/2 p-1">
            <svg
              width="16"
              height="15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
              class="w-5 h-5 text-gray-700"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.333"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <input
            className="input rounded-full px-10 py-3 border-2 border-transparent focus:outline-none w-[50%] focus:border-[black] placeholder-gray-400 transition-all duration-300 shadow-md"
            required=""
            ref={inputRef}
            value={ID}
            onChange={handleInputChange}
            placeholder="Enter document ID or file hash" // Updated placeholder
          />
          <button
            type="button"
            class="absolute right-[490px] -translate-y-[45%] top-1/2 p-1"
            onClick={handleClearInput}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </form>
        </div>
        

        {/* Display search results */}
        {fetchedData && (
          <div className="mt-5 mr-56 flex flex-col items-center">
            <div className="text-center translate-x-[100px] font-bold text-2xl uppercase mb-10">
              Certificate Valid
            </div>
            <div className="flex">
              <div
                className="w-8/12  p-8 bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <div className="p-10 text-center flex flex-col">
                  <h1 className="text-4xl text-center mt-16 uppercase">
                    Certificate of Completion
                  </h1>
                  <h2 className="text-center pt-2">Awarded to</h2>
                  <p className="text-4xl text-center py-4 uppercase">
                    {fetchedData.name}
                  </p>
                  <p className="text-center">For completing the course</p>
                  <p className="text-3xl text-center py-6">
                    {fetchedData.courseName}
                  </p>
                  <div className="flex justify-center pt-40 gap-2">
                    <p>Course duration:</p>
                    <p>{fetchedData.coursePeriod}</p>
                  </div>
                  <div className="flex justify-center pt-2 gap-2">
                    <p>Course detail:</p>
                    <p>{fetchedData.courseDetails}</p>
                  </div>
                  <div className="flex justify-center pt-2 gap-2">
                    <p>ID :</p>
                    <p
                      className="break-all"
                      data-testid="shortenedId"
                      data-id={hashedId}
                    >
                      {hashedId && hashedId.substring(0, 10)}...
                    </p>
                    <button
                      className="ml-2 px-2 py-1 rounded-md bg-[#e9e9e9] text-sm hover:bg-gray-300"
                      onClick={handleCopy}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex justify-center pt-2 gap-2">
                    <p>Issue date :</p>
                    <p>{fetchedData.createdAt}</p>
                  </div>
                </div>
              </div>
              <img
                src={fetchedData.image}
                className="w-4/12 h-auto object-contain ml-4"
              />
            </div>
          </div>
        )}
        <div>
          {isCopyPromptVisible && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-[300px] text-xs translate-y-[195px]  p-4 ">
              ID copied!
            </div>
          )}
        </div>
      </div>

      {/* search  end*/}
           {/* Information Section */}
     <div className="container mx-auto py-20 px-4">
     <img src={cube1} alt="" className="-translate-x-[300px]" />

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold uppercase    ">
            Blockchain Technology <br /> for Secure Certificate Storage
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Learn how blockchain technology revolutionizes certificate storage,
            ensuring authenticity, security, and tamper-proof records.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform transition duration-500 hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Immutability and Transparency
            </h3>
            <p className="text-gray-500 text-base">
              Blockchain's immutable ledger ensures that records cannot be altered
              or deleted, providing complete transparency and trust in certificate
              data.
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700">
                Blockchain
              </span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform transition duration-500 hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Enhanced Security
            </h3>
            <p className="text-gray-500 text-base">
              Blockchain's decentralized nature and cryptographic security measures
              protect certificates from unauthorized access and tampering.
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-700">
                Security
              </span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform transition duration-500 hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Improved Verifiability
            </h3>
            <p className="text-gray-500 text-base">
              Blockchain allows for easy and instant verification of certificates,
              reducing the risk of forgery and ensuring the authenticity of
              credentials.
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-700">
                Verification
              </span>
            </div>
          </div>
        </div>
      </div>
      
{/* about us  */}
      <div className="Aboutus h-[900px] pt-[200px]" id="aboutus">
        <h1 className="text-center font-bold py-10 text-2xl">About Us </h1>
        
        <p className="text-center leading-relaxed tracking-wide text-5xl">
          {" "}
          A <strong>BLOCKCHAIN-BASED</strong> STORAGE SYSTEM WHICH <br />{" "}
          ENHANCES <strong>TRUST</strong> -AND- <strong>TRANSPARENCY</strong>
          <br /> HELPING US TO <strong>ERADICATE</strong>-FORGED <br /> FAKE
          CERTIFICATE-&-DOCUMENTS{" "}
        </p>
        <div>
        <img src={cube1} alt=""  className="h-[300px]"/>
        <img src={cube1} alt="" className=" translate-x-[1700px] -translate-y-[1000px] " />

        </div>
      </div>
      <div className="h-[900px]">
      <h1 className="pt-10 text-center text-2xl font-bold uppercase " id="why">
        why choose us{" "}
      </h1>

  {/* aim  */}
      <div className="aim flex justify-between mt-20 space-x-4 px-20" id="aim">
        <div className="flex flex-col items-center">
          <div className="w-96 h-128 flex items-center justify-center">
            <img src={cub} alt="Storage" className="w-[500px] h-[600px]" />
          </div>
          <h3 className="text-center font-bold text-xl mt-4">Storage</h3>
          <p className="text-center text-lg mt-2">
            Secure storage for certificates, diplomas, licenses,
            <br />
            and more. Our advanced encryption safeguards
            <br />
            your sensitive data from unauthorized access.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-96 h-128 flex items-center justify-center">
            <img src={comp} alt="Organizing" className="w-[500px] h-[600px]" />
          </div>
          <h3 className="text-center font-bold text-xl mt-4">Organizing</h3>
          <p className="text-center text-lg mt-2">
            Efficient document organization for easy retrieval,
            <br />
            with user-friendly interface lets you categorize,
            <br />
            tag, and label files, ensuring quick access when
            <br />
            needed.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-96 h-128 flex items-center justify-center">
            <img
              src={earth}
              alt="Verification"
              className="w-[500px] h-[600px]"
            />
          </div>
          <h3 className="text-center font-bold text-xl mt-4">Verification</h3>
          <p className="text-center text-lg mt-2">
            Provides document verification to authenticate
            <br />
            & maintain the integrity of certificates
            <br />
            and documents, ensuring legitimacy.
          </p>
        </div>
      </div>
      </div>

    

     
      

      {/* member  */}
      <div className="members " id="members">
      <img src={cube1} alt="" className="h-[150px] translate-x-[1800px]" />
        <h1 className="text-2xl font-bold uppercase  text-center pt-20 pb-10">Members </h1>
        <p className="text-xl  pb-10  text-center">A member of a blockchain developer team plays a crucial role in <br />designing, implementing, and maintaining decentralized applications and <br /> smart contracts to advance the project's objectives.</p>
        <div className="MCards flex justify-center gap-10 ">
          {/* card 1 */}
          <div class="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:hover:text-[white]  before:bg-gradient-to-bl from-[#1d1d1d] via-[#1d1d1d] to-[#1d1d1d] before:absolute before:top-0 w-80 h-72 relative bg-[#f7f7f7] flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
            <div class="w-28 h-28  bg-white mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500">
              <img
                src={Manager}
                className="rounded-[100%] h-[110px] w-[120px]  "
              />
            </div>
            <div class="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span class="text-2xl font-semibold  group-hover:text-white">
                Project Manager
              </span>
              <p className="group-hover:text-white">
                juggles deadlines, budgets, and quality.{" "}
              </p>
            </div>
            <button className="loginBut w-[250px] px-4 py-1">
              <span>
                <a href="https://www.linkedin.com/in/ngawang-gyeltshen-46452025b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"  >Ngawang Gyeltshen </a>
              </span>
            </button>
          </div>
          {/* card 2 */}

          <div class="group  before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-[#1d1d1d] via-[#1d1d1d] to-[#1d1d1d] before:absolute before:top-0 w-80 h-72 relative bg-[#f7f7f7] flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
            <div class="w-28 h-28 bg-[white] mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500">
              <img
                src={Bend}
                className="rounded-[100%] h-[110px] w-[110px] bg-white"
              />
            </div>
            <div class="z-10  group-hover:-translate-y-10 transition-all duration-500">
              <span class="text-2xl font-semibold group-hover:text-white">
                Backend Developer
              </span>
              <p className="group-hover:text-white">
                Server-side functionality for applications
              </p>
            </div>
            <button className="loginBut w-[200px] px-4 py-1">
              <span>
                <a href="">Karma Wangchuk</a>
              </span>
            </button>
          </div>
          {/* card 3  */}

          <div class="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-br from-[#1d1d1d] via-[#1d1d1d] to-[#1d1d1d] before:absolute before:top-0 w-80 h-72 relative bg-[#f7f7f7] flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
            <div class="w-28 h-28 bg-white mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500">
              <img src={Fend} className="rounded-[100%] h-[110px] w-[110px]" />
            </div>
            <div class="z-10  group-hover:-translate-y-10 transition-all duration-500">
              <span class="text-2xl font-semibold group-hover:text-white">
                Front End Developer
              </span>
              <p className="group-hover:text-white">
                Builds and maintains website interfaces.
              </p>
            </div>
            <button className="loginBut w-[200px] px-4 py-1">
              <span>
                <a href="">Tandn p Gyalmo</a>
              </span>
            </button>
          </div>
          {/* card 4 */}

          <div class="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-br from-[#1d1d1d] via-[#1d1d1d] to-[#1d1d1d] before:absolute before:top-0 w-80 h-72 relative bg-[#f7f7f7] flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
            <div class="w-28 h-28 bg-white mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500">
              <img src={Bc} className="rounded-[100%] h-[110px] w-[110px]" />
            </div>
            <div class="z-10  group-hover:-translate-y-10 transition-all duration-500">
              <span class="text-2xl font-semibold group-hover:text-white">
                Blockchain specilist
              </span>
              <p className="group-hover:text-white">
                develops and manages blockchain systems.
              </p>
            </div>

            <button className="loginBut w-[150px] px-4 py-1">
              <span>
                <a href="">Rada Dorji</a>
              </span>
            </button>
          </div>
          
        </div>
        <img src={cube1} alt="" className="h-[200px]" />
     

      </div>

      <footer className="bg-white py-16 mt-20">
      <img src={cube1} alt="" className="h-[200px] translate-x-[1800px] translate-y-[100px]" />

        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex">

            <div>
              <Logo className="w-300px h-[300px] -translate-x-[160px] translate-y-[10px]" />
              
            </div>
            <div className="-translate-y-[5px]">
              {/* contact us */}
              <div className="flex items-center  pt-[100px] ">
                <div className="relative flex rounded-full overflow-hidden bg-[#eeeeee] shadow-xl w-[80%] -translate-x-[200px] translate-y-[20px]">
                  <input
                    type="email"
                    name="email"
                    placeholder="contact us "
                    className=" input bg-transparent outline-none border-none pl-6 pr-10 py-5 w-[500px] font-sans text-lg font-semibold"
                  />
                  <div className="absolute right-2 top-[0.4em]">
                    <button className="w-14 h-14 rounded-full bg-violet-500 group shadow-xl flex items-center justify-center relative overflow-hidden">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative z-10"
                      >
                        <path
                          d="M63.6689 29.0491L34.6198 63.6685L0.00043872 34.6194L29.0496 1.67708e-05L63.6689 29.0491Z"
                          fill="white"
                          fillOpacity="0.01"
                        ></path>
                        <path
                          d="M42.8496 18.7067L21.0628 44.6712"
                          stroke="white"
                          strokeWidth="3.76603"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M26.9329 20.0992L42.85 18.7067L44.2426 34.6238"
                          stroke="white"
                          strokeWidth="3.76603"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <div className="w-full h-full rotate-45 absolute left-[32%] top-[32%] bg-black group-hover:-left-[100%] group-hover:-top-[100%] duration-1000"></div>
                      <div className="w-full h-full -rotate-45 absolute -left-[32%] -top-[32%] group-hover:left-[100%] group-hover:top-[100%] bg-black duration-1000"></div>
                    </button>
                  </div>
                </div>
              </div>
              {/* contact us end */}
            </div>
          </div>
          {/* logo end  */}

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-20 ">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                  >
                    Email Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                  >
                    Campaigns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                  >
                    Branding
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                  >
                    Offline
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div class="group grid grid-cols-3 gap-0 hover:gap-2 duration-500 relative shadow-sm">
              <h1 class="absolute z-10 group-hover:hidden duration-200 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="w-7 h-7 text-gray-800"
                >
                  <path
                    d="M5 7h14M5 12h14M5 17h14"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke="currentColor"
                  ></path>
                </svg>
              </h1>
              <a href="#">
                <svg
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-[#cc39a4] backdrop-blur-md group-hover:shadow-xl rounded-tl-lg flex justify-center items-center w-full h-full text-[#cc39a4] hover:text-white duration-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="opacity-0 group-hover:opacity-100 duration-200"
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-blue-500 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-blue-500 hover:text-white duration-200"
                >
                  <path
                    clip-rule="evenodd"
                    d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                    fill-rule="evenodd"
                    class="opacity-0 group-hover:opacity-100 duration-200"
                  ></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-red-500 backdrop-blur-md group-hover:shadow-xl rounded-tr-lg flex justify-center items-center w-full h-full text-red-400 hover:text-white duration-200"
                >
                  <path
                    clip-rule="evenodd"
                    d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM10 3.707a8.82 8.82 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.755 45.755 0 0 0 10 3.707Zm-6.358 6.555a8.57 8.57 0 0 1 4.73-5.981 53.99 53.99 0 0 1 3.168 4.941 32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.641 31.641 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM12 20.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 15.113 13a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    fill-rule="evenodd"
                    class="opacity-0 group-hover:opacity-100 duration-200"
                  ></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-green-500 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-green-500 hover:text-white duration-200"
                >
                  <path
                    d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"
                    class="opacity-0 group-hover:opacity-100 duration-200"
                  ></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-black backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-black hover:text-white duration-200"
                >
                  <path
                    d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    stroke-width="2"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke="currentColor"
                    class="opacity-0 group-hover:opacity-100 duration-200"
                  ></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-blue-600 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-blue-700 hover:text-white duration-200"
                >
                  <path
                    d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"
                    class="opacity-0 group-hover:opacity-100 duration-200"
                  ></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-black backdrop-blur-md group-hover:shadow-xl rounded-bl-lg flex justify-center items-center w-full h-full text-black hover:text-white duration-200"
                >
                  <path
                    clip-rule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    fill-rule="evenodd"
                    class="opacity-0 group-hover:opacity-100 duration-200"
                  ></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-blue-600 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-blue-600 hover:text-white duration-200"
                >
                  <path
                    clip-rule="evenodd"
                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    fill-rule="evenodd"
                    class="opacity-0 group-hover:opacity-100 duration-200"
                  ></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-red-500 backdrop-blur-md group-hover:shadow-xl rounded-br-lg flex justify-center items-center w-full h-full text-red-500 hover:text-white duration-200"
                >
                  <path
                    clip-rule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    fill-rule="evenodd"
                    class="opacity-0 group-hover:opacity-100 duration-200"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Public;
