import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type MovieRowProps = {
  genres: string[];
  runtime: string;
  score: string;
  title: string;
};

const MovieRow = ({ title, runtime, genres, score }: MovieRowProps) => {
  return (
    <Row>
      <Col>{title}</Col>
      <Col>{runtime}</Col>
      <Col>
          <ul>
              {genres.map((genre) => (
                  <li>{genre}</li>
              ))}
          </ul>
      </Col>
      <Col>{score}</Col>
    </Row>
  );
};

export default MovieRow;
