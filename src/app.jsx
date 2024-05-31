import React, { useState, useEffect } from "react";
import Login from "./component/Login"; // Corrected import statement

import abi from "./contractJson/Certify.json";
import { ethers } from "ethers"; //import ethers library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Public from "./component/Public";
import UserRegister from "./pages/UserRegister";
import InstitutionRegister from "./pages/InstitutionRegister";
import ForgotPassword from "./pages/Forgetpassword";
import UserChoice from "./pages/UserChoice";
import ChangeP from "./pages/Changep";
import OtpEnter from "./pages/OtpEnter";
import Certificatepart from "./pages/certificate/Certificatepart";
import Certificateform from "./pages/certificate/Certificateform";
import Certificatevalidation from "./pages/certificate/certificatevalidation";
import Dashboard from "./pages/User/Dashboard";
import Dashboard1 from "./pages/User/Dashboard1";
import Accountsetting from "./pages/User/Accountsetting";
import Institutiondashboard from "./pages/Institution/Institutiondashboard";
import Institutionaccountsetting from "./pages/Institution/Institutionaccountsetting";
import InsOtpVer from "./pages/InsOtpVer";
import InsLogin from "./component/InsLogin";
import CertificateOfCompletion from "./pages/CertificateOfCompletion";
import Admindashboard from "./pages/Admin/Admindashboard";
import Loading from "./component/LoadingAnimation";
import AdminLogin from "./component/adminLogin";
import ForgotPasswordChange from "./pages/FPchangepassword";
import ForgotInsPassword from "./pages/ForgetInstitute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/uregister" element={<UserRegister />} />
        <Route path="/iregister" element={<InstitutionRegister />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/ForgotInsPassword" element={<ForgotInsPassword />} />

        <Route
          path="/ForgotPasswordChange"
          element={<ForgotPasswordChange />}
        />
        <Route path="/userchoice" element={<UserChoice />} />
        <Route path="/changep" element={<ChangeP />} />
        <Route path="/otpenter" element={<OtpEnter />} />
        <Route path="/insotpver" element={<InsOtpVer />} />
        <Route path="/inslogin" element={<InsLogin />} />
        <Route path="/csigner" element={<Certificatepart />} />
        <Route path="/cform" element={<Certificateform />} />
        <Route path="/cvalid" element={<Certificatevalidation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/accountsetting" element={<Accountsetting />} />
        <Route path="/Loading" element={<Loading />} />
        <Route
          path="/institutiondashboard"
          element={<Institutiondashboard />}
        />
        <Route
          path="/institutionaccountsetting"
          element={<Institutionaccountsetting />}
        />
        <Route
          path="/certificateofcompletion"
          element={<CertificateOfCompletion />}
        />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
