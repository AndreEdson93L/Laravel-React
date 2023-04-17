import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-3">App News</h1>
          <p className="text-center mb-4">
            Search your favorite articles in science, technology, and more.
          </p>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                {message && (
                  <Alert variant="danger" className="mb-3">
                    <p>{message}</p>
                  </Alert>
                )}
                <Form.Group controlId="email" className="mb-3">
                  <Form.Control
                    ref={emailRef}
                    type="email"
                    placeholder="Email or phone number"
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Control
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button className="w-100 mb-3" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <p className="text-center mt-3">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
