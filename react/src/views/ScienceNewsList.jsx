import React, { useEffect, useState } from "react";
import axios from "../axios-client";
import SearchBar from "../components/SearchBar";

const ScienceNewsList = () => {
  const [news, setScienceNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchScienceNews = async () => {
    try {
      const response = await axios.get("/fetch-science-news", {
        //I would like to not have to repeat this logic
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
  }, [keyword]); // Add keyword as a dependency to refetch news when keyword changes

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
  };

  return (
    <div>
      <h1>Science News</h1>
      <SearchBar onSubmit={handleSearch} />
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
