import React from "react";
import { Container } from "react-bootstrap";

const NotFound = () => {
  const imageUrl =
    "https://3.bp.blogspot.com/_Fzq94YVbHHM/TKZG3B-K4II/AAAAAAAA50w/2wr82d3oKf4/s1600/best_404_error_pages_02.jpg";

  return (
    <Container className="text-center">
      <h1>404 Page Not Found</h1>
      <img
        src={imageUrl}
        alt="404 Error - Page not found"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </Container>
  );
};

export default NotFound;
