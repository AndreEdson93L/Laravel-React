import axiosClient from "../axios-client.js";
import "../index.css";
import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="text-center mb-3 login-sign-up">Signup for Free</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  {errors && (
                    <Alert variant="danger" className="mb-3">
                      {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                      ))}
                    </Alert>
                  )}
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Control
                      ref={nameRef}
                      type="text"
                      placeholder="Full Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Control
                      ref={emailRef}
                      type="email"
                      placeholder="Email Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="mb-3">
                    <Form.Control
                      ref={passwordRef}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="password_confirmation"
                    className="mb-3"
                  >
                    <Form.Control
                      ref={passwordConfirmationRef}
                      type="password"
                      placeholder="Repeat Password"
                    />
                  </Form.Group>
                  <Button className="w-100 mb-3" type="submit">
                    Signup
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <p className="text-center mt-3">
              Already registered? <Link to="/login">Sign In</Link>
            </p>
          </Col>
        </Row>
      </Container>
  );
}
