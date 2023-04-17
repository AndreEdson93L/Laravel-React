// components/GuardiansNewsList.jsx
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
  }, [keyword]);

  return (
    <Container>
      <Row className="justify-content-center text-center">
        <h1>The Guardian</h1>
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
        {guardianNews.map((article, index) => (
          <ListGroup.Item key={index} style={{ border: "none" }}>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Card>
                  <Card.Body>
                    <Card.Title>{article.webTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Section: {article.sectionName}
                    </Card.Subtitle>
                    <Card.Text>
                      Published at: {article.webPublicationDate}
                    </Card.Text>
                    <Card.Link
                      href={article.webUrl}
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

export default GuardiansNewsList;
