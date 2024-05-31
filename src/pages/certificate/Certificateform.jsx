import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../public/background.jpeg";
import "../../css/index.css";

function CertificateForm() {
  const navigate = useNavigate();

 React.useEffect(() => {
    const mail = window.localStorage.getItem("email");
    return () => {
      setEmail(mail);
      console.log(email)
    }
  }, [])

  const handleButtonClick = () => {
    
    const cPeriod = courseHours + " " + durationType;
    if (validateForm()) {
      const FormData = {
        name: personName,
        email: email, 
        courseName: courseName, 
        coursePeriod: cPeriod, 
        courseDetails: courseDetails,
        createdAt: certificationDate,
        cid: ID
      }
      fetch("https://prj-certifi-backend.onrender.com/api/certificate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      }).then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            window.localStorage.setItem("certId", data.data._id);
            navigate("/csigner");
          } else {
            alert("Certificate creation failed. Please try again.");
          }
        });
      }
      
    }

  const [personName, setPersonName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseHours, setCourseHours] = useState('');
  const [courseDetails, setCourseDetails] = useState('');
  const [email, setEmail] = useState('');
  const [certificationDate, setCertificationDate] = useState(Date.now());
  const [ID, setID] = useState('');
  const [durationType, setDurationType] = useState('month');
  const [errors, setErrors] = useState({});

  const handleDurationTypeChange = (event) => {
    setDurationType(event.target.value);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    return formattedDate;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!personName.trim()) {
      newErrors.personName = "Please enter your name.";
    }
    if (!courseName.trim()) {
      newErrors.courseName = "Please enter the course name.";
    }
    if (!courseHours || isNaN(courseHours)) {
      newErrors.courseHours = "Please enter a valid course duration.";
    } else if (durationType === 'month' && (courseHours < 1 || courseHours > 12)) {
      newErrors.courseHours = "Course duration for months must be between 1 and 12.";
    } else if (durationType === 'year' && (courseHours < 1 || courseHours > 7)) { 
      newErrors.courseHours = "Course duration for years must be between 1 and 7.";
    }
    if (!courseDetails.trim()) {
      newErrors.courseDetails = "Please enter course details.";
    }
    if (!ID || isNaN(ID)) {
      newErrors.ID = "Please enter a valid ID.";
    }
    if (!certificationDate) {
      newErrors.certificationDate = "Please select the issue date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="w-full flex justify-between pl-20 pb-5 fixed top-0 left-0">
        <p className="">
          <Link
            to={"/dashboard"}
            className="pl-4 "
          >
            <img src={logo} alt="" />
          </Link>
        </p>
      </nav>
      <div className="flex flex-1"> 
        <div className="w-9/12 bg-gray-100 p-8 bg-center bg-no-repeat" style={{backgroundImage: `url(${backgroundImage})`}}> 
          <div className="p-10 text-center flex flex-col"> 
            <h1 className="text-4xl text-center pt-28 uppercase">Certificate of completion</h1> 
            <h2 className="text-center pt-2">Awarded to</h2> 
            <p className="text-4xl text-center py-4 uppercase">{personName}</p> 
            <p className="text-center">For completing the course</p> 
            <p className="text-3xl text-center py-6">{courseName}</p> 
            <div className="flex pt-40 px-[460px] gap-2"> 
              <p>Course duration:</p> 
              <p>{courseHours} {durationType}</p> 
            </div>
            <div className="flex pt-2 px-[460px]  gap-2"> 
              <p>Course detail:</p> 
              <p >{courseDetails}</p> 
            </div>
            <div className="flex pt-2 px-[460px]  gap-2"> 
              <p>ID :</p> 
              <p>{ID}</p> 
            </div>
            <div className="flex pt-2 px-[460px]  gap-2"> 
              <p>Issue date :</p> 
              {certificationDate && formatDate(certificationDate)} 
            </div> 
          </div> 
        </div>
        <div className="w-3/12 bg-white p-10"> 
          <h2 className="text-xl font-bold mb-4">Document details</h2> 
          <p className="text-gray-600 mb-6"> 
            Correctly add all the required details regarding the document that you 
            want to store in our blockchain. 
          </p> 
          <div className="mb-4"> 
            <label htmlFor="">Your Name </label> 
            <div className="pb-6"> 
              <input type="text" id="Full Name " 
                className={`w-full border rounded py-2 px-3 ${errors.personName ? 'border-red-500' : ''}`} 
                placeholder="Full Name " 
                value={personName} 
                onChange={(e) => setPersonName(e.target.value)} 
              /> 
              {errors.personName && <p className="text-red-500 text-sm">{errors.personName}</p>}
            </div> 
            <label htmlFor="">Course Name </label> 
            <div className="pb-6"> 
              <input type="text" id="Course name " 
                className={`w-full border rounded py-2 px-3 ${errors.courseName ? 'border-red-500' : ''}`}
                placeholder="Course Name"
                value={courseName} 
                onChange={(e) => setCourseName(e.target.value)} 
              /> 
              {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName}</p>} 
            </div> 
            <div className="pb-6"> 
              <label htmlFor="">Course Duration </label> 
              <input type="number" inputMode="numeric" pattern="[0-9]" id="Duration " 
                className={`w-full border rounded py-2 px-4 ${errors.courseHours ? 'border-red-500' : ''}`} 
                placeholder="Course Duration "
                value={courseHours} 
                onChange={(e) => setCourseHours(e.target.value)} 
              /> 
              {errors.courseHours && <p className="text-red-500 text-sm">{errors.courseHours}</p>}
              <select 
                value={durationType} 
                onChange={handleDurationTypeChange} 
                className="w-full border rounded py-2 px-3 mt-2" 
              >
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div> 
            <label htmlFor="">Course Detail </label> 
            <div className="pb-6"> 
              <input type="text " id="Details " 
                className={`w-full border rounded py-2 px-3 ${errors.courseDetails ? 'border-red-500' : ''}`}
                placeholder="Details"
                value={courseDetails} 
                onChange={(e) => setCourseDetails(e.target.value)} 
              /> 
              {errors.courseDetails && <p className="text-red-500 text-sm">{errors.courseDetails}</p>} 
            </div> 
            <label htmlFor="">Your Student ID / National ID </label> 
            <div className="pb-6"> 
              <input type="number" inputMode="numeric" pattern="[0-9]" id="ID" 
                className={`w-full border rounded py-2 px-3 ${errors.ID ? 'border-red-500' : ''}`}
                placeholder="Student ID /National ID " 
                value={ID} 
                onChange={(e) => setID(e.target.value)} 
              /> 
              {errors.ID && <p className="text-red-500 text-sm">{errors.ID}</p>}
            </div> 
            {/* <label htmlFor="">Issued Date</label> 
            <div className="pb-6"> 
              <input type="date" id="Issue " 
                className={`w-full border rounded py-2 px-3 ${errors.certificationDate ? 'border-red-500' : ''}`}
                value={certificationDate} 
                onChange={(e) => setCertificationDate(e.target.value)} 
              /> 
              {errors.certificationDate && <p className="text-red-500 text-sm">{errors.certificationDate}</p>}
            </div> 
          </div> 
          <div className="pt-2">  */}
           <div className="pt-5">
           <button type="submit" className="loginBut w-[400px]  " onClick={handleButtonClick} >
            <span>Create a new certificate </span>
          </button>
           </div>
           
          </div> 
        </div> 
      </div> 
    </div> 
  );
}

export default CertificateForm;