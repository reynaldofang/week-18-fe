import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Login from "./Login";
import Dashboard from "./dashboard";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {" "}
          {/* Use Routes instead of Switch */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
