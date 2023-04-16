// src/components/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="form-control"
      />
      <button type="submit" className="btn btn-outline-primary ms-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
