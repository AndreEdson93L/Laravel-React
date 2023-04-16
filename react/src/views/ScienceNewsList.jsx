import React, { useEffect, useState } from "react";
import axios from "../axios-client";
import { useSearchContext } from "../context/SearchContext";

const ScienceNewsList = () => {
  const [news, setScienceNews] = useState([]);
  const { searchKeyword } = useSearchContext();

  const fetchScienceNews = async () => {
    try {
      const response = await axios.get("/fetch-science-news", {
        params: {
          keyword: searchKeyword?.trim() === "" ? null : searchKeyword
        },
      });
      setScienceNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchScienceNews();
  }, [searchKeyword]);

  return (
    <div>
      <h1>Science News</h1>
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
