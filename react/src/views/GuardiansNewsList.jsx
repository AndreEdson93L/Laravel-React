import React, { useEffect, useState } from "react";
import axios from "../axios-client";

const GuardiansNewsList = () => {
  const [guardianNews, setGuardianNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchGuardianNews = async () => {
    try {
      const response = await axios.get("/fetch-guardians-news", {
        params: {
          keyword: keyword.trim() === "" ? null : keyword,
        },
      });

      setGuardianNews(response.data.response.results);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchGuardianNews();
  }, []); // Remove the dependencies to only fetch on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchGuardianNews();
  };

  return (
    <div>
      <h1>Guardian News</h1>
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
