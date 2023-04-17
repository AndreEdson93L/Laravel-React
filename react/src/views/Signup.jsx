import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

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
          <h1 className="text-center">Signup for Free</h1>
          <Form onSubmit={onSubmit}>
            {errors && (
              <Alert variant="danger">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </Alert>
            )}
            <Form.Group controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control ref={nameRef} type="text" placeholder="Full Name" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Email Address"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="password_confirmation">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Repeat Password"
              />
            </Form.Group>
            <Button className="btn btn-block" type="submit">
              Signup
            </Button>
            <p className="message text-center">
              Already registered? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
