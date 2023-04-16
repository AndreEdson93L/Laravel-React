import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
// DefaultLayout.jsx
import { useSearchContext } from "../context/SearchContext";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();
  const { setSearchKeyword } = useSearchContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  const handleSearch = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };

  return (
    <div id="defaultLayout">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">News App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as={NavLink} to="/news">
                Economy
              </Nav.Link>
              <Nav.Link as={NavLink} to="/guardian-news">
                The Guardian
              </Nav.Link>
              <Nav.Link as={NavLink} to="/technology-news">
                Technology
              </Nav.Link>
              <Nav.Link as={NavLink} to="/science-news">
                Science
              </Nav.Link>
              <Nav.Link as={NavLink} to="/sport-news">
                Sport
              </Nav.Link>
            </Nav>
            <SearchBar onSubmit={setSearchKeyword} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

