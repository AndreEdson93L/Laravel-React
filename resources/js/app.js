import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <Router>
      <Routes>{router}</Routes>
    </Router>
  );
}

export default App;