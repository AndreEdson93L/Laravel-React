/// components/NewsList.jsx

import React, { useEffect, useState } from "react";
import axios from "../axios-client";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/fetch-news");
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1>Business News</h1>
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
