import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./../src/css/index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
