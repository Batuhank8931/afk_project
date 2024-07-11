// src/App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/login";
import Basvuru from "./components/basvuru";
import SignUp from "./components/signin";
import ForgetPassword from "./components/forgetpassword";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/basvuru"
              element={
                <ProtectedRoute>
                  <Basvuru />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignUp />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
