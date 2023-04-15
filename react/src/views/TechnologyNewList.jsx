// components/TechnologyNewsList.jsx
import React, { useEffect, useState } from "react";
import axios from "../axios-client";

const TechnologyNewsList = () => {
  const [technologyNews, setTechnologyNews] = useState([]);

  useEffect(() => {
    const fetchTechnologyNews = async () => {
      try {
        const response = await axios.get("/fetch-technology-news");
        console.log("Response from backend:", response);
        setTechnologyNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching technology news:", error);
      }
    };

    fetchTechnologyNews();
  }, []);

  return (
    <div>
      <h1>Technology News</h1>
      <ul>
        {technologyNews.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>Source: {article.source.name}</p>
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

export default TechnologyNewsList;
