import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import '../Login/Login.css';
import Login from "../Login/Login";

import Logout from "../Logout/Logout";
import DicomViewer from '../Dicom/DicomViewer';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<DicomViewer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
