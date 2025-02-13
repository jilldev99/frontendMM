import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<ProtectedRoute><BookList /></ProtectedRoute>} />
          <Route path="/add-book" element={<ProtectedRoute><BookForm /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/books" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
