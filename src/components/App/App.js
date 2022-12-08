import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import Login from "../Login/Login";

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
