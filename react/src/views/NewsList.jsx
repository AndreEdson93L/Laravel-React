import React, { useEffect, useState } from "react";
import axios from "../axios-client";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchNews = async () => {
    try {
      const response = await axios.get("/fetch-news", {
        params: {
          keyword: keyword.trim() === "" ? null : keyword,
        },
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []); // Remove the dependencies to only fetch on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div>
      <h1>Business News</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>Author: {article.author}</p>
            <p>Published at: {article.publishedAt}</p>
            <a href={article.url} target="_blank" rel="noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
