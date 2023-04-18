import React, { useEffect, useState } from "react";
import axios from "../axios-client";
import "../index.css";
import {
  Card,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";

const TechnologyNewsList = () => {
  const [technologyNews, setTechnologyNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchTechnologyNews = async () => {
    try {
      const response = await axios.get("/fetch-technology-news", {
        params: {
          keyword: keyword.trim() === "" ? null : keyword,
        },
      });
      setTechnologyNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching technology news:", error);
    }
  };

  useEffect(() => {
    fetchTechnologyNews();
  }, [keyword]);

  return (
    <Container>
      <Row className="justify-content-center text-center">
        <h1 className="title-views">Technology</h1>
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
        {technologyNews.map((article, index) => (
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

export default TechnologyNewsList;
