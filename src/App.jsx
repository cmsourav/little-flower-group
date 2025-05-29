import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudent from "./pages/AddStudentPage";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/enroll" element={<AddStudent />} />
      </Routes>
    </Router>

  );
}

export default App;
