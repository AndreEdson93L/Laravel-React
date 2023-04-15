import React, { useEffect, useState } from "react";
import axios from "../axios-client";

const GuardiansNewsList = () => {
  const [guardianNews, setGuardianNews] = useState([]);

  useEffect(() => {
    const fetchGuardianNews = async () => {
      try {
        const response = await axios.get("/fetch-guardians-news");
        console.log("Response from backend:", response);
        setGuardianNews(response.data.response.results);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchGuardianNews();
  }, []);

  return (
    <div>
      <h1>Guardian News</h1>
      <ul>
        {guardianNews.map((article, index) => (
          <li key={index}>
            <h3>{article.webTitle}</h3>
            <p>Section: {article.sectionName}</p>
            <p>Published at: {article.webPublicationDate}</p>
            <a href={article.webUrl} target="_blank" rel="noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuardiansNewsList;
