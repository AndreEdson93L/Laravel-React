import React, { useEffect, useState } from "react";
import axios from "../axios-client";
import SearchBar from "../components/SearchBar";

const SportNewsList = () => {
  const [news, setSportNews] = useState([]);

  const fetchSportNews = async (keyword = "") => {
    try {
      const response = await axios.get("/fetch-sport-news", {
        params: {
          keyword: keyword.trim() === "" ? null : keyword,
        },
      });
      setSportNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchSportNews();
  }, []);

  const handleSearchSubmit = (searchKeyword) => {
    fetchSportNews(searchKeyword);
  };

  return (
    <div>
      <h1>Sport News</h1>
      <SearchBar onSubmit={handleSearchSubmit} />
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

export default SportNewsList;