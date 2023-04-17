// components/ScienceNewsList.jsx
import React, { useEffect, useState } from "react";
import axios from "../axios-client";

const ScienceNewsList = () => {
  const [news, setScienceNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchScienceNews = async () => {
    try {
      const response = await axios.get("/fetch-science-news", {
        params: {
          keyword: keyword.trim() === "" ? null : keyword
        },
      });
      setScienceNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchScienceNews();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchScienceNews();
  };

  return (
    <div>
      <h1>Science News</h1>
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

export default ScienceNewsList;
