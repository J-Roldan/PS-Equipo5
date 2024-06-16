import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./Pages/Home";
import ProductManagement from "./Pages/ProductManagement";
import Login from "./Pages/Login";
import MiCuenta from "./Pages/MiCuenta";
import ProductDetail from "./Pages/ProductDetail";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/ProductManagement" element={<ProductManagement />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/products/:productId" element={<ProductDetail/>} />
                <Route path="/MiCuenta" element={<MiCuenta/>} />
                <Route path="/AdminDashboard" element={<AdminDashboard/>} />
            </Routes>
        </Router>
    );
}

export default App;
