import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import "../index.css";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-3 title-views">{user.id ? `Update User: ${user.name}` : 'New User'}</h1>
          <Card>
            <Card.Body>
              {loading && <div className="text-center">Loading...</div>}
              {errors && (
                <Alert variant="danger" className="mb-3">
                  {Object.keys(errors).map((key) => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </Alert>
              )}
              {!loading && (
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Control
                      value={user.name}
                      onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                      placeholder="Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Control
                      value={user.email}
                      onChange={(ev) =>
                        setUser({ ...user, email: ev.target.value })
                      }
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="mb-3">
                    <Form.Control
                      type="password"
                      onChange={(ev) =>
                        setUser({ ...user, password: ev.target.value })
                      }
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group controlId="password_confirmation" className="mb-3">
                    <Form.Control
                      type="password"
                      onChange={(ev) =>
                        setUser({ ...user, password_confirmation: ev.target.value })
                      }
                      placeholder="Password confirmation"
                    />
                  </Form.Group>
                  <Button className="w-100 mb-3" type="submit">
                    Save
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}