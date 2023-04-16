import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default App;
