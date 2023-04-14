// components/NewsList.jsx

import React, { useEffect, useState } from "react";
import axios from "../axios-client"; // Make sure to import your axios instance

const NewsList = () => {
  const [news, setNews] = useState([]);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    source: "",
  });
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: [],
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "de",
              category: "business",
              //apiKey: process.env.REACT_APP_NEWS_API_KEY,
              apiKey: "00d3b42d7c444ec9bd4f6577e4aa6b59",
              // Include additional parameters like search, filters, and preferences
            },
          }
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1>News</h1>
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
