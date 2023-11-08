import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Screen1 />} />
        <Route path="/screen2" element={<Screen2 />} />
      </Routes>
    </Router>
  );
}

export default App;
