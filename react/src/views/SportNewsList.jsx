import React, { useEffect, useState } from "react";
import axios from "../axios-client";
import {
  Card,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";

const SportNewsList = () => {
  const [sportNews, setSportNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchSportNews = async () => {
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
  }, [keyword]);

  return (
    <Container>
      <Row className="justify-content-center text-center">
        <h1>Sport News</h1>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <ListGroup>
        {sportNews.map((article, index) => (
          <ListGroup.Item key={index} style={{ border: "none" }}>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Card>
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Author: {article.author}
                    </Card.Subtitle>
                    <Card.Text>Published at: {article.publishedAt}</Card.Text>
                    <Card.Link
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read more
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SportNewsList;
