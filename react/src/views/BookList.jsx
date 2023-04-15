// components/BookList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [list, setList] = useState("hardcover-fiction");
  const [bestsellersDate, setBestsellersDate] = useState("");
  const [offset, setOffset] = useState(20);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("localhost:8000/api/books", {
          params: {
            list,
            //"bestsellers-date": bestsellersDate,
            offset,
          },
        });
        console.log(response); 
        setBooks(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [list, bestsellersDate, offset]);

  return (
    <div>
      <h1>Books</h1>
      <div>
        <label htmlFor="list">List:</label>
        <select id="list" value={list} onChange={(e) => setList(e.target.value)}>
          <option value="hardcover-fiction">Hardcover Fiction</option>
          <option value="e-book-fiction">E-Book Fiction</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h3>{book.book_details[0].title}</h3>
            <p>Author: {book.book_details[0].author}</p>
            <p>Description: {book.book_details[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
