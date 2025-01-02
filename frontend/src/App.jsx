import React from "react"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/login"
import { Product } from "./pages/Product"
import { Logout } from "./pages/Logout"
import { FrontPage } from "./pages/FrontPage"
import { Route, Routes, Navigate } from "react-router-dom"
import 'react-toastify/ReactToastify.css';
import './css/toastCss.css'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/frontpage" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/frontpage" element={<FrontPage />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/products" element={<Product  />} />
      </Routes>
    </>
  )
}

export default App
